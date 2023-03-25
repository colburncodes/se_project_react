import React from "react";
import { ItemCard } from "../ItemCard/ItemCard";
import { WeatherCard } from "../WeatherCard/WeatherCard";
import { CurrentTemperatureUnitContext } from "../../context/CurrentTemperatureUnitContext";
import "./Main.css";

export function Main({ isLoggedIn, weatherData, cards, onCardClick }) {
  const { currentTemperatureUnit } = React.useContext(
    CurrentTemperatureUnitContext
  );

  let temperature = weatherData.main?.temp;
  const weatherType = () => {
    if (temperature >= 86) {
      return "hot";
    } else if (temperature >= 66 && temperature <= 85) {
      return "warm";
    } else if (temperature <= 65) {
      return "cold";
    }
  };

  const filteredCards = cards.filter((card) => card.weather === weatherType());

  return (
    <main className="main">
      <section className="main__clothes">
        <div className="main__info">
          <div className="main__description-container">
            <WeatherCard weatherData={weatherData} />
            {currentTemperatureUnit === "F" ? (
              <p className="main__description">
                Today is {Math.round(temperature)}°{currentTemperatureUnit} and
                it is {weatherType()} / You may want to wear:
              </p>
            ) : (
              <p className="main__description">
                Today is {Math.round(((temperature - 32) * 5) / 9)}°
                {currentTemperatureUnit} and it is {weatherType()} / You may
                want to wear:
              </p>
            )}
          </div>
        </div>
        <ul className="main__items">
          {cards
            .filter((card) => card.weather === weatherType())
            .map((filteredCard) => (
              <ItemCard
                isLoggedIn={isLoggedIn}
                key={filteredCard.id}
                card={filteredCard}
                onCardClick={onCardClick}
              />
            ))}
        </ul>
      </section>
    </main>
  );
}
