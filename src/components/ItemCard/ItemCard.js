import React from "react";
import "./ItemCard.css";

export function ItemCard({ name, url, alt }) {
  return (
    <div className="card">
      <div className="card__content">
        <div className="card__title-background">
          <h2 className="card__title">{name}</h2>
        </div>

        {/* <img src="./images/heart.svg" alt="Heart Icon" /> */}
        <img className="card__image" src={url} alt={alt} />
      </div>
    </div>
  );
}

