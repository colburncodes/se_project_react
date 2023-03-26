import React from "react";
import { ItemCard } from "../ItemCard/ItemCard";
import "./ClothesSection.css";
export function ClothesSection({ cards, handleAddClick, onCardClick }) {
  return (
    <div className="clothes__section">
      <div className="clothes__section-info">
        <h2 className="clothes__section-title">Your items</h2>
        <button
          className="clothes__button-add"
          type="button"
          onClick={handleAddClick}
        >
          + Add new
        </button>
      </div>
      <div className="clothes__section-container">
        <ul className="clothes__section-items">
          {cards.map((card) => (
            <ItemCard key={card._id} card={card} onCardClick={onCardClick} />
          ))}
        </ul>
      </div>
    </div>
  );
}
