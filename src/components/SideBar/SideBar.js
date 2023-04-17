import React from "react";
import "./SideBar.css";

export function SideBar({ currentUser, onProfileClick, onSignOut }) {
  return (
    <div className="sidebar">
      <div className="sidebar__container">
        <img
          className="sidebar__avatar"
          alt="User avatar"
          src={currentUser.avatar}
        />
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
