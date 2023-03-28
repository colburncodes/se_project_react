import React from "react";
import "./SideBar.css";
import avatarPath from "../../images/avatar.svg";

export function SideBar({ currentUser, onProfileClick, onSignOut }) {
  return (
    <div className="sidebar">
      <div className="sidebar__container">
        <img className="sidebar__avatar" alt="Avatar" src={avatarPath} />
        <p className="sidebar__username">{currentUser.name}</p>
      </div>
      <button
        className="sidebar__edit-profile"
        type="button"
        onClick={onProfileClick}
      >
        Change profile
      </button>

      <button className="sidebar__sign-out" type="button" onClick={onSignOut}>
        Log out
      </button>
    </div>
  );
}
