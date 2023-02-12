import "./ToggleSwitch.css";
import React from "react";
import { CurrentTemperatureUnitContext } from "../../context/CurrentTemperatureUnitContext";

export function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = React.useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <div className="toggleswitch__container">
      <label className="toggleswitch">
        {""}
        <input
          className="toggleswitch__input"
          type="checkbox"
          value={currentTemperatureUnit}
          onClick={handleToggleSwitchChange}
        />
        <span className="toggleswitch__slider"></span>
      </label>
    </div>
  );
}
