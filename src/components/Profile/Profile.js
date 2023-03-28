import React from "react";
import { ClothesSection } from "../ClothesSection/ClothesSection";
import { SideBar } from "../SideBar/SideBar";
import "./Profile.css";

export function Profile({
  cards,
  isLoggedIn,
  onAddClick,
  onCardClick,
  onProfileClick,
  onSignOut,
}) {
  return (
    <div className="profile">
      <SideBar onProfileClick={onProfileClick} onSignOut={onSignOut} />
      <ClothesSection
        cards={cards}
        isLoggedIn={isLoggedIn}
        onAddClick={onAddClick}
        onCardClick={onCardClick}
      />
    </div>
  );
}
