import React from "react";
import "./SideBar.css";
import avatarPath from "../../images/avatar.svg";

export function SideBar() {
  const userName = "Terrance Tegegne";

  return (
    <div className="sidebar">
      <div className="sidebar__container">
        <img className="sidebar__avatar" alt="Avatar" src={avatarPath} />
        <p className="sidebar__username">{userName}</p>
      </div>
    </div>
  );
}
