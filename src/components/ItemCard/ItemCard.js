import React from "react";
import "./ItemCard.css";
export function ItemCard(data, onCardClick) {
  console.log(data);
  return (
    <div className="card" onClick={() => onCardClick}>
      <div className="card__content">
        <div className="card__title-background">
          <h2 className="card__title">{data.name}</h2>
        </div>
        {/* <img src="./images/heart.svg" alt="Heart Icon" /> */}
        <img className="card__image" src={data.link} alt={data.name} />
      </div>
    </div>
  );
}