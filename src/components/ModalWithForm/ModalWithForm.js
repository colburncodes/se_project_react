import React from "react";
import "./ModalWithForm.css";

export function ModalWithForm({
  isOpen,
  title,
  type,
  buttonText,
  children,
  closeModal,
  onSubmit,
}) {
  return (
    <div className={isOpen ? `modal` : `modal__form-${type} modal__close`}>
      <div className="modal__container">
        <button
          className="modal__close"
          type="button"
          onClick={closeModal}
        ></button>
        <h1 className="modal__title">{title}</h1>
        <form onSubmit={onSubmit} className={`modal__form modal__form-${type}`}>
          <fieldset className="modal__form-fieldset">
            {children}
            {buttonText === "Next" ? (
              <button className="modal__save-button-signin" type="submit">
                {buttonText}
              </button>
            ) : (
              <button className="modal__save-button" type="submit">
                {buttonText}
              </button>
            )}
          </fieldset>
        </form>
      </div>
    </div>
  );
}
