import React from "react";
import { ItemCard } from "../ItemCard/ItemCard";
import "./ClothesSection.css";
export function ClothesSection({
  cards,
  isLoggedIn,
  onAddClick,
  onCardClick,
  handleLikeClick,
}) {
  return (
    <div className="clothes__section">
      <div className="clothes__section-info">
        <h2 className="clothes__section-title">Your items</h2>
        <button
          className="clothes__button-add"
          type="button"
          onClick={onAddClick}
        >
          + Add new
        </button>
      </div>
      <div className="clothes__section-container">
        <ul className="clothes__section-items">
          {cards.map((card) => {
            return (
              <ItemCard
                isLoggedIn={isLoggedIn}
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                handleLikeClick={handleLikeClick}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}
