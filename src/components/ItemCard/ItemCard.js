import React from "react";
import "./ItemCard.css";
export function ItemCard({ card, onCardClick }) {
  return (
    <div className="card" onClick={() => onCardClick(card)}>
      <div className="card__content">
        <div className="card__title-background">
          <h2 className="card__title">{card.name}</h2>
        </div>
        {/* <img src="./images/heart.svg" alt="Heart Icon" /> */}
        <img className="card__image" src={card.link} alt={card.name} />
      </div>
    </div>
  );
}