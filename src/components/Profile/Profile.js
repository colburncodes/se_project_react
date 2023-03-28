import React from "react";
import { ClothesSection } from "../ClothesSection/ClothesSection";
import { SideBar } from "../SideBar/SideBar";
import "./Profile.css";

export function Profile({
  cards,
  currentUser,
  handleAddClick,
  onCardClick,
  onProfileClick,
  onSignOut,
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
        handleAddClick={handleAddClick}
        onCardClick={onCardClick}
      />
    </div>
  );
}
