import React from "react";

export function ModalWithForm({ title, name, buttonText }) {
  return (
    <div className="modal">
      <div className="modal__container">
        <h1 className="modal__title">{title}</h1>
        <form className="modal__form modal__form-add" novalidate>
          <fieldset className="modal__form-fieldset">
            <input
              id="garment-name"
              className={`modal__input modal__input-garment-${name}`}
              type="text"
              name={name}
              placeholder="Name"
              minlength="1"
              maxlength="30"
              required
            />
            <span className="modal__input-error garment-name-error"></span>
            <input
              id="card-url"
              className={`modal__input modal__input-garment-${name}`}
              type="url"
              name={name}
              placeholder="Image URL"
              pattern="https://.*"
              required
            />
            <span className="modal__input-error garment-url-error"></span>
            <p>Select the weather type:</p>
            <div className="modal__input modal__input_type_radio">
              <div>
                <input
                  type="radio"
                  id="choiceHot"
                  name="weatherType"
                  value="hot"
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
                />
                <label className="modal__label_radio" htmlFor="choiceCold">
                  Cold
                </label>
              </div>
            </div>
            <button
              className="modal__save-button modal__button-disabled"
              type="submit"
            >
              {buttonText}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
