import React from "react";
import logoPath from "../../images/wtwr.svg";
import avatarPath from "../../images/avatar.svg";
import "./Header.css";

export function Header({ weatherData, handleAddClick }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const userName = "Terrance Tegegne";

  return (
    <>
      <header className="header">
        <div className="header__container">
          <img className="header__logo" src={logoPath} alt="What To Wear" />
          <p className="header__date-location">{currentDate}, St Louis</p>
        </div>
        <div className="header__info">
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
    </>
  );
}
