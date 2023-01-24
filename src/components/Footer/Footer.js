import React from "react";
import { date } from "../../utils/constants";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__title">Developed by Colburn Sanders</p>
        <p className="footer__year">{date}</p>
      </div>
    </footer>
  );
}
