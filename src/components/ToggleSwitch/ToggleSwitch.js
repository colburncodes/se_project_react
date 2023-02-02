import React, { useEffect, useState } from "react";
import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../../context/CurrentTemperatureUnitContext";

export function ToggleSwitch() {
  const { currentTemperature, handleToggleSwitchChange } = React.useContext(
    CurrentTemperatureUnitContext
  );

  const [isChecked, setIsChecked] = useState(currentTemperature === "C");

  useEffect(() => {
    setIsChecked(currentTemperature === "C");
  }, [currentTemperature]);

  return (
    <>
      <input
        className="weather__toggle-checkbox"
        type="checkbox"
        checked={isChecked}
        onChange={handleToggleSwitchChange}
        value={currentTemperature}
      />
      <label
        className="weather__toggle-label"
        htmlFor={`weather__toggle-new`}
      />
      <span className="weather__toggle-button" />
    </>
  );
}
