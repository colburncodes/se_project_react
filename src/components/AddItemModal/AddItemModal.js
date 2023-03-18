import React, { useEffect, useState } from "react";
import { ModalWithForm } from "../ModalWithForm/ModalWithForm";

export const AddItemModal = ({ name, isOpen, isLoading, onAddItem, onCloseModal }) => {
  const [itemName, setItemName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  useEffect(() => {
    setItemName("");
    setImageUrl("");
    setWeather("");
  }, [isOpen]);

  function handleNameChange(e) {
    setItemName(e.target.value);
  }

  function handleImageChange(e) {
    setImageUrl(e.target.value);
  }

  function handleWeatherChange(e) {
    setWeather(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddItem(name, imageUrl, weather);
  }

  return (
    <ModalWithForm
      title="New Garment"
      name={name}
      buttonText={isLoading ? "Saving..." : "Save"}
      isOpen={isOpen}
      onAddItem={onAddItem}
      onSubmit={handleSubmit}
      closeModal={onCloseModal}
    >
      <label className="modal__label">Name</label>
      <input
        id="garment-name"
        className={`modal__input modal__input-garment-name`}
        type="text"
        name="nameOfClothes"
        value={itemName}
        placeholder="Name"
        minLength="1"
        maxLength="30"
        onChange={handleNameChange}
        required
      />
      <span className="modal__input-error garment-name-error"></span>
      <label className="modal__label">Image</label>
      <input
        id="card-url"
        className={`modal__input modal__input-garment-url`}
        type="url"
        name="imageUrl"
        value={imageUrl}
        placeholder="Image URL"
        pattern="https://.*"
        onChange={handleImageChange}
        required
      />
      <span className="modal__input-error garment-url-error"></span>
      <p className="modal__weather-choice">Select the weather type:</p>
      <div className="modal__input modal__input_type_radio">
        <div>
          <input
            type="radio"
            id="choiceHot"
            name="weatherType"
            value="hot"
            checked={weather === "hot"}
            onChange={handleWeatherChange}
          />
          <label className="modal__label_radio" htmlFor="choiceHot">
            Hot
          </label>
        </div>
        <div>
          <input
            type="radio"
            id="choiceWarm"
            name="weatherType"
            value="warm"
            checked={weather === "warm"}
            onChange={handleWeatherChange}
          />
          <label className="modal__label_radio" htmlFor="choiceWarm">
            Warm
          </label>
        </div>
        <div>
          <input
            type="radio"
            id="choiceCold"
            name="weatherType"
            value="cold"
            checked={weather === "cold"}
            onChange={handleWeatherChange}
          />
          <label className="modal__label_radio" htmlFor="choiceCold">
            Cold
          </label>
        </div>
      </div>
    </ModalWithForm>
  );
};
