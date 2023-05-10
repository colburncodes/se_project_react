import React from "react";
import "./WeatherCard.css";
import cloudPath from "../../images/Union.svg";
import sunPath from "../../images/sun.svg";
import { CurrentTemperatureUnitContext } from "../../context/CurrentTemperatureUnitContext";
import Container from "@mui/material/Container";

export function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = React.useContext(
    CurrentTemperatureUnitContext
  );
  let temperature = weatherData.main?.temp;

  return (
    <Container>
      <div className="weather__container">
        {currentTemperatureUnit === "F" ? (
          <p className="weather__temperature">
            {Math.round(temperature)}°{currentTemperatureUnit}
          </p>
        ) : (
          <p className="weather__temperature">
            {Math.round(((temperature - 32) * 5) / 9)}°{currentTemperatureUnit}
          </p>
        )}
        <img className="weather__sunny" src={sunPath} alt="sun" />
        <img className="weather__cloud-union" src={cloudPath} alt="clouds" />
      </div>
    </Container>
  );
}
