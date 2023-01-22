import { useState, useEffect } from "react";
import "./App.css";
import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
import { Main } from "./Main/Main";
import { ItemModal } from "./ItemModal/ItemModal";
import { ModalWithForm } from "./ModalWithForm/ModalWithForm";
import { WeatherCard } from "./WeatherCard/WeatherCard";
import { defaultClothingItems } from "../utils/clothingitems";
import { location, BASE_URL, API_KEY } from "../utils/constants";
import Api from "../utils/weatherApi";

const api = new Api({ baseUrl: BASE_URL, apiKey: API_KEY });

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [activeModal, setActiveModal] = useState();
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (card) => {
    console.log(card);
    setSelectedCard(card);
    setActiveModal("preview");
  };

  useEffect(() => {
    api
      .getWeatherData(location, API_KEY)
      .then((data) => {
        setWeatherData(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="App">
      <div className="App__content">
        <Header
          weatherData={weatherData}
          handleAddClick={() => setActiveModal("create")}
        />
        <WeatherCard weatherData={weatherData} />
        <Main
          weatherData={weatherData}
          cards={defaultClothingItems}
          onCardClick={handleCardClick}
        />
        <Footer />
      </div>
      {activeModal === "create" && (
        <ModalWithForm
          title="New Garment"
          name="create"
          buttonText="Add garment"
          closeModal={setActiveModal}
        >
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
        </ModalWithForm>
      )}
      {activeModal === "preview" && (
        <ItemModal card={selectedCard} onClose={setActiveModal} />
      )}
    </div>
  );
}

export default App;
