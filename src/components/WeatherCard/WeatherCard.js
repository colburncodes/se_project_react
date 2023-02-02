import React from "react";
import "./WeatherCard.css";
import cloudPath from "../../images/Union.svg";
import sunPath from "../../images/sun.svg";

export function WeatherCard({ weatherData }) {
  const temperature = weatherData.main?.temp;
  return (
    <div className="weather__container">
      <p className="weather__temperature">{Math.round(temperature)}°F</p>
      <img className="weather__sunny" src={sunPath} alt="sun" />
      <img className="weather__cloud-union" src={cloudPath} alt="clouds" />
    </div>
  );
}
