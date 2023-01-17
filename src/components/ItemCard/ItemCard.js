import React from "react";
import "./ItemCard.css";

function ItemCard({ name, url, alt }) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <img src="<%=require('./images/heart.svg')%>" alt="Heart Icon" />
      <img className="card__image" src={url} alt={alt} />
    </div>
  );
}

export default ItemCard;
