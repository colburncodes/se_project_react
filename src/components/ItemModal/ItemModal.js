import React from "react";

export function ItemModal({ data, onClose }) {
  return (
    <div className="modal">
      <div className="modal__container">
        <button
          className="modal__close"
          type="button"
          onClick={() => onClose(false)}
        ></button>

        <img className="modal__image" src={data.link} alt="garment" />
        <div className="modal__label">
          <p className="modal__title">{data.name}</p>
          <p className="modal__description">Weather:{data.weather}</p>
        </div>
      </div>
    </div>
  );
};


