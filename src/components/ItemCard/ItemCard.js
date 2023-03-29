import React, { useContext } from "react";
import likeicon from "../../images/heart.svg";
import "./ItemCard.css";
import { CurrentUserContext } from "../../context/CurrentUserContext";
export function ItemCard({ card, onCardClick, handleLikeClick }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = card.likes.some((user) => user === currentUser._id);

  const itemLikeButtonClassName = `card__heart-icon ${
    isLiked ? "card__heart-icon" : "card__like-btn" //"card__like-btn"
  }`;
  return (
    <div className="card" onClick={() => onCardClick(card)}>
      <div className="card__content">
        <div className="card__title-background">
          <h2 className="card__title">{card.name}</h2>
          <img
            className={itemLikeButtonClassName}
            src={likeicon}
            alt={card.name}
            onClick={(e) => {
              e.stopPropagation();
              console.log({ isLiked: isLiked });
              handleLikeClick(card._id, !isLiked);
            }}
          />
        </div>
        <img className="card__image" src={card.imageUrl} alt={card.name} />
      </div>
    </div>
  );
}
