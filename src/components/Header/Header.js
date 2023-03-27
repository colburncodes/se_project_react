import React from "react";
import { Link } from "react-router-dom";
import logoPath from "../../images/wtwr.svg";
import avatarPath from "../../images/avatar.svg";
import { currentDate } from "../../utils/constants";
import { ToggleSwitch } from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";

export function Header({
  isLoggedIn,
  currentUser,
  weatherData,
  onAddClick,
  onLoginClick,
  onRegisterClick,
}) {
  if (!weatherData) return null;
  const username = "Andrew Clark";
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
        {isLoggedIn ? (
          <div></div>
        ) : (
          <>
            <button
              className="header__register"
              type="button"
              onClick={onRegisterClick}
            >
              Sign Up
            </button>
            <button
              className="header__login"
              type="button"
              onClick={onLoginClick}
            >
              Log in
            </button>
          </>
        )}

        <ToggleSwitch />

        {isLoggedIn ? (
          <div className="header__info-user">
            <button
              className="header__add-clothes"
              type="button"
              onClick={onAddClick}
            >
              + Add clothes
            </button>
            <p className="header__username">{username}</p>
            <Link to={"/profile"}>
              <img className="header__avatar" alt="Avatar" src={avatarPath} />
            </Link>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </header>
  );
}
