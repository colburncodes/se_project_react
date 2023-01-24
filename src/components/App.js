import { useState, useEffect } from "react";
import "./App.css";
import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
import { Main } from "./Main/Main";
import { ItemModal } from "./ItemModal/ItemModal";
import { ModalWithForm } from "./ModalWithForm/ModalWithForm";
import { GarmentFormModal } from "./Forms/GarmentFormModal";
import { WeatherCard } from "./WeatherCard/WeatherCard";
import { location, BASE_URL, API_KEY } from "../utils/constants";
import { defaultClothingItems } from "../utils/clothingitems";
import Api from "../utils/weatherApi";

const api = new Api({ baseUrl: BASE_URL, apiKey: API_KEY });

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [activeModal, setActiveModal] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const closeAllPopups = () => {
    setActiveModal(null);
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
          closeModal={closeAllPopups}
        >
          <GarmentFormModal />
        </ModalWithForm>
      )}
      {activeModal === "preview" && (
        <ItemModal card={selectedCard} onClose={closeAllPopups} />
      )}
    </div>
  );
}

export default App;
