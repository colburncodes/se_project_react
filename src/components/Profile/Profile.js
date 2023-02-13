import React from "react";
import { ClothesSection } from "../ClothesSection/ClothesSection";
import { SideBar } from "../SideBar/SideBar";
import "./Profile.css";

export function Profile({ clothes, onCardClick }) {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection cards={clothes} onCardClick={onCardClick} />
    </div>
  );
}
