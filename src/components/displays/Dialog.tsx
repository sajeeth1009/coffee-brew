import React from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import {
  CoffeeType,
  CoffeeSize,
  SelectedCoffeeExtra,
} from "../../api/types/coffeeMenu";

interface DialogProps {
  open: boolean;
  title: string;
  type?: CoffeeType;
  size?: CoffeeSize;
  extras?: SelectedCoffeeExtra[];
  content?: string;
  onConfirm: () => void;
  onClose: () => void;
}

const Dialog: React.FC<DialogProps> = (props) => {
  const { t } = useTranslation(["dialog"]);

  return (
    <React.Fragment>
      <Modal
        show={props.open}
        onHide={props.onClose}
        size="lg"
        className="border-0"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="bg-primary text-white ">
          <Modal.Title id="contained-modal-title-vcenter" className="fw-bold">
            {props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <span className="fw-bold">Type</span>: {props.type?.name}
          </p>
          <p>
            <span className="fw-bold">Size</span>: {props.size?.name}
          </p>
          <p>
            <span className="fw-bold">Extras:</span>
          </p>

          {props.extras?.map((extra) => {
            return (
              <p className="pl-1" key={extra._id}>
                <span>{extra.name}</span>: {extra.subselections.name}
              </p>
            );
          })}
        </Modal.Body>
        <Modal.Footer className="border-0">
          <button
            type="button"
            className="btn btn-secondary text-gray"
            onClick={props.onClose}
          >
            {t("close")}
          </button>
          <button
            type="button"
            className="btn btn-primary text-white fw-bold"
            onClick={props.onConfirm}
          >
            {t("confirm")}
          </button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default Dialog;
