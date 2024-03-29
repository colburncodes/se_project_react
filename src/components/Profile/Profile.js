import React from "react";
import { ClothesSection } from "../ClothesSection/ClothesSection";
import { SideBar } from "../SideBar/SideBar";
import "./Profile.css";

export function Profile({
  cards,
  isLoggedIn,
  currentUser,
  onAddClick,
  onCardClick,
  onProfileClick,
  onSignOut,
  handleLikeClick,
}) {
  return (
    <div className="profile">
      <SideBar
        currentUser={currentUser}
        onProfileClick={onProfileClick}
        onSignOut={onSignOut}
      />
      <ClothesSection
        cards={cards}
        isLoggedIn={isLoggedIn}
        onAddClick={onAddClick}
        onCardClick={onCardClick}
        handleLikeClick={handleLikeClick}
      />
    </div>
  );
}
