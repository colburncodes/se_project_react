import React, { useState } from "react";
import logoPath from "../../images/wtwr.svg";
import avatarPath from "../../images/avatar.svg";
import { currentDate } from "../../utils/constants";
import { ToggleSwitch } from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";

export function Header({ isOn, weatherData, handleAddClick }) {
  const [value, setValue] = useState(false);
  if (!weatherData) return null;

  const userName = "Terrance Tegegne";

  return (
    <header className="header">
      <div className="header__container">
        <img className="header__logo" src={logoPath} alt="What To Wear" />
        <p className="header__date-location">
          {currentDate}, {weatherData.name}
        </p>
      </div>
      <div className="header__info">
        <ToggleSwitch isOn={value} handleToggle={() => setValue(!value)} />
        <button
          className="header__add-clothes"
          type="button"
          onClick={handleAddClick}
        >
          + Add clothes
        </button>
        <p className="header__username">{userName}</p>
        <img className="header__avatar" alt="Avatar" src={avatarPath} />
      </div>
    </header>
  );
}
