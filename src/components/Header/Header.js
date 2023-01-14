import React from "react";
import logoPath from "../../images/wtwr.svg";
import "./Header.css";

export function Header() {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const userName = "Colburn Sanders";

  function foo() {}
  return (
    <>
      <header className="header page__section">
        <div className="header__container">
          <img className="header__logo" src={logoPath} alt="What To Wear" />
          <p className="header__date-location">{currentDate}, St Louis</p>
        </div>
      </header>
    </>
  );
}
