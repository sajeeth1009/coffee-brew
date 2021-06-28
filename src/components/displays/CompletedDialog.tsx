import React, { useState } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

interface DialogProps {
  open: boolean;
  title: string;
  content: string;
  onConfirm: () => void;
}

const Dialog: React.FC<DialogProps> = (props) => {
  const { t } = useTranslation(["dialog"]);
  const [modalOpen, setModalOpen] = useState(props.open);

  return (
    <React.Fragment>
      {modalOpen ? (
        <div
          className="modal fade"
          id="exampleModalCenter"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  {props.title}
                </h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setModalOpen(!modalOpen)}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">...</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setModalOpen(!modalOpen)}
                >
                  {t("close")}
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => props.onConfirm}
                >
                  {t("confirm")}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default Dialog;

/*


<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
 */
