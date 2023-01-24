import React from "react";
import "./ItemModal.css";

export function ItemModal({ card, onClose }) {
  return (
    <div className="modal__preview">
      <div className="modal__container-preview">
        <button
          className="modal__close-preview"
          type="button"
          onClick={() => onClose(null)}
        ></button>

        <div className="modal__label-preview">
          <img
            className="modal__image-preview"
            src={card.link}
            alt="Clothing Item"
          />
          <p className="modal__title-preview">{card.name}</p>
          <p className="modal__description">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
};


