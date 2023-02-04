import React, { useEffect, useState } from "react";
import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../../context/CurrentTemperatureUnitContext";

export function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = React.useContext(
    CurrentTemperatureUnitContext
  );

  const [isChecked, setIsChecked] = useState(currentTemperatureUnit === "C");

  useEffect(() => {
    setIsChecked(currentTemperatureUnit === "C");
  }, [currentTemperatureUnit]);

  return (
    <>
      <div className="toggle__switch">
        <p className="toggle__switch-unit-fahrenheit">
          {currentTemperatureUnit}
        </p>
        <p className="toggle__switch-unit-celsius">C</p>
        <input
          className="toggle__switch-checkbox"
          type="checkbox"
          checked={isChecked}
          onChange={handleToggleSwitchChange}
          value={currentTemperatureUnit}
        />
        <label className="toggle__switch-label" htmlFor={`toggle__switch`} />
        <span className="toggle__switch-button" />
      </div>
    </>
  );
}
