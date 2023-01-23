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
import { GarmentModal } from "./Forms/GarmentModal";

const api = new Api({ baseUrl: BASE_URL, apiKey: API_KEY });

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [activeModal, setActiveModal] = useState();
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (card) => {
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
          <GarmentModal />
        </ModalWithForm>
      )}
      {activeModal === "preview" && (
        <ItemModal card={selectedCard} onClose={setActiveModal} />
      )}
    </div>
  );
}

export default App;
