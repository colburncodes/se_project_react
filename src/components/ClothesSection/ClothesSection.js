import React from "react";
import { ItemCard } from "../ItemCard/ItemCard";
import "./ClothesSection.css";
export function ClothesSection({ cards, handleAddClick }) {
  return (
    <div className="clothes__section">
      <div className="clothes__section-info">
        {/* <h1 className="clothes__section-title">Your items</h1>
        <button
          className="header__add-clothes"
          type="button"
          onClick={handleAddClick}
        >
          + Add new
        </button> */}
      </div>
      <div className="clothes__section-container">
        <ul className="clothes__section-items">
          {cards.map((card) => (
            <ItemCard key={card.id} card={card} />
          ))}
        </ul>
      </div>
    </div>
  );
}
