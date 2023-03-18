import React from "react";
import { Link } from "react-router-dom";
import logoPath from "../../images/wtwr.svg";
import avatarPath from "../../images/avatar.svg";
import { currentDate } from "../../utils/constants";
import { ToggleSwitch } from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";

export function Header({
  weatherData,
  handleAddClick,
  handleLoginClick,
  handleRegisterClick,
}) {
  if (!weatherData) return null;

  const userName = "Terrance Tegegne";

  return (
    <header className="header">
      <div className="header__container">
        <Link to={"/"}>
          <img className="header__logo" src={logoPath} alt="What To Wear" />
        </Link>
        <p className="header__date-location">
          {currentDate}, {weatherData.name}
        </p>
      </div>
      <div className="header__info">
          <button
          className="header__register"
          type="button"
          onClick={handleRegisterClick}
        >
          Sign Up
        </button>
        <button
          className="header__login"
          type="button"
          onClick={handleLoginClick}
        >
          Log in
        </button>
        <ToggleSwitch />
        <button
          className="header__add-clothes"
          type="button"
          onClick={handleAddClick}
        >
          + Add clothes
        </button>
        <p className="header__username">{userName}</p>
        <Link to={"/profile"}>
          <img className="header__avatar" alt="Avatar" src={avatarPath} />
        </Link>
      </div>
    </header>
  );
}
