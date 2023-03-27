import React from "react";
import "./SideBar.css";
import avatarPath from "../../images/avatar.svg";

export function SideBar({ onProfileClick, onSignOut }) {
  const userName = "Andrew Clark";

  return (
    <div className="sidebar">
      <div className="sidebar__container">
        <img className="sidebar__avatar" alt="Avatar" src={avatarPath} />
        <p className="sidebar__username">{userName}</p>
      </div>
      <button
        className="sidebar__edit-profile"
        type="button"
        onClick={onProfileClick}
      >
        Change profile data
      </button>

      <button className="sidebar__sign-out" type="button" onClick={onSignOut}>
        Log out
      </button>
    </div>
  );
}
