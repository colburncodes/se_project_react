import React from "react";
import "./Main.css";
import { ItemCard } from "../ItemCard/ItemCard";

export function Main({ weatherData, cards, onCardClick }) {
  const temperature = weatherData.temperature;

  const weatherType = () => {
    if (temperature >= 86) {
      return "hot";
    } else if (temperature >= 66 && temperature <= 85) {
      return "warm";
    } else if (temperature <= 65) {
      return "cold";
    }
  };

  return (
    <main className="main">
      <section className="main__clothes">
        <div className="main__info">
          <div className="main__description-container">
            <p className="main__description">
              Today is {temperature} F and it is {weatherType()} / You may want
              to wear:
            </p>
          </div>
        </div>
        <ul className="main__items">
          {/* {cards.map((card) => (
            <ItemCard key={card._id} />
          ))} */}
        </ul>
      </section>
    </main>
  );
}
