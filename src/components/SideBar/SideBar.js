import React, { useContext } from "react";
import "./SideBar.css";
import { CurrentUserContext } from "../../context/CurrentUserContext";

export function SideBar({ onProfileClick, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__container">
        <img
          className="sidebar__avatar"
          alt="Avatar"
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
