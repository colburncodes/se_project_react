import React from "react";
import "./WeatherCard.css";
import cloudPath from "../../images/Union.svg";
import sunPath from "../../images/sun.svg";
import { CurrentTemperatureUnitContext } from "../../context/CurrentTemperatureUnitContext";

export function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = React.useContext(
    CurrentTemperatureUnitContext
  );
  const temperature = weatherData.main?.temp;
  return (
    <div className="weather__container">
      <p className="weather__temperature">
        {Math.round(temperature)}°{currentTemperatureUnit}
      </p>
      <img className="weather__sunny" src={sunPath} alt="sun" />
      <img className="weather__cloud-union" src={cloudPath} alt="clouds" />
    </div>
  );
}
