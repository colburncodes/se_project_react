import React from "react";

export function GarmentFormModal() {
  return (
    <>
      <label className="modal__label">Name</label>
      <input
        id="garment-name"
        className={`modal__input modal__input-garment-name`}
        type="text"
        name="name"
        placeholder="Name"
        minLength="1"
        maxLength="30"
        required
      />
      <span className="modal__input-error garment-name-error"></span>
      <label className="modal__label">Image</label>
      <input
        id="card-url"
        className={`modal__input modal__input-garment-url`}
        type="url"
        name="url"
        placeholder="Image URL"
        pattern="https://.*"
        required
      />
      <span className="modal__input-error garment-url-error"></span>
      <p className="modal__weather-choice">Select the weather type:</p>
      <div className="modal__input modal__input_type_radio">
        <div>
          <input type="radio" id="choiceHot" name="weatherType" value="hot" />
          <label className="modal__label_radio" htmlFor="choiceHot">
            Hot
          </label>
        </div>
        <div>
          <input type="radio" id="choiceWarm" name="weatherType" value="warm" />
          <label className="modal__label_radio" htmlFor="choiceWarm">
            Warm
          </label>
        </div>
        <div>
          <input type="radio" id="choiceCold" name="weatherType" value="cold" />
          <label className="modal__label_radio" htmlFor="choiceCold">
            Cold
          </label>
        </div>
      </div>
    </>
  );
}
