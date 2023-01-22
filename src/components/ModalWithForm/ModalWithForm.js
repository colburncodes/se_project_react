import React from "react";
import "./ModalWithForm.css";

export function ModalWithForm({
  title,
  name,
  buttonText,
  children,
  closeModal,
}) {
  return (
    <div className="modal">
      <div className="modal__container">
        <button
          className="modal__close"
          type="button"
          onClick={() => closeModal(false)}
        ></button>
        <h1 className="modal__title">{title}</h1>
        <form className={`modal__form modal__form-${name}`} noValidate>
          <fieldset className="modal__form-fieldset">
            {children}
            <button
              className="modal__save-button modal__button-disabled"
              type="submit"
            >
              {buttonText}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
