import React from "react";
import "./ModalWithForm.css";

export function ModalWithForm({
  title,
  name,
  buttonText,
  children,
  closeModal,
  onSubmit,
}) {
  return (
    <div className="modal">
      <div className="modal__container">
        <button
          className="modal__close"
          type="button"
          onClick={closeModal}
        ></button>
        <h1 className="modal__title">{title}</h1>
        <form onSubmit={onSubmit} className={`modal__form modal__form-${name}`}>
          <fieldset className="modal__form-fieldset">
            {children}
            <button className="modal__save-button" type="submit">
              {buttonText}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
