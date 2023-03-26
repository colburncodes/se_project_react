import React from "react";
import likeicon from "../../images/heart.svg";
import "./ItemCard.css";
export function ItemCard({ isLoggedIn, card, onCardClick }) {
  return (
    <div className="card" onClick={() => onCardClick(card)}>
      <div className="card__content">
        <div className="card__title-background">
          <h2 className="card__title">{card.name}</h2>
          <img className="card__heart-icon" alt="heart" src={likeicon} />
        </div>
        <img className="card__image" src={card.imageUrl} alt={card.name} />
      </div>
    </div>
  );
}