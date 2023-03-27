import React from "react";
import "./ItemModal.css";
import { CurrentUserContext } from "../../context/CurrentUserContext";

export function ItemModal({ card, onCloseModal, onDelete }) {
  // TODO: GET CURRENT USER POPULATED IN CONTEXT OBJECT
  // const { currentUser } = React.useContext(CurrentUserContext);

  const isOwner = card.owner._id;
  const itemDeleteButtonClassName = `modal__delete-item ${
    isOwner ? "modal__delete-item" : "modal__delete-hidden"
  }`;
  return (
    <div className={`modal__preview`}>
      <div className="modal__container-preview">
        <button
          className="modal__close-preview"
          type="button"
          onClick={() => onCloseModal(null)}
        ></button>

        <div className="modal__label-preview">
          <img
            className="modal__image-preview"
            src={card?.imageUrl}
            alt="Clothing Item"
          />
          <p className="modal__title-preview">{card?.name}</p>
          <p className="modal__description">Weather: {card?.weather}</p>
          <button
            onClick={onDelete}
            type="button"
            className={itemDeleteButtonClassName}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}
