import React from "react";
import "./ItemModal.css";

export function ItemModal({ card, onClose, onDelete }) {
  return (
    <div className={`modal__preview`}>
      <div className="modal__container-preview">
        <button
          className="modal__close-preview"
          type="button"
          onClick={() => onClose(null)}
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
            className="modal__delete-item"
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
};


