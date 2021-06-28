import React from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";

interface DialogProps {
  open: boolean;
  title: string;
  content: string;
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
        <Modal.Body>{props.content}</Modal.Body>
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
