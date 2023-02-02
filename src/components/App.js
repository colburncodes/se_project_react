import { useState, useEffect } from "react";
import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
import { Main } from "./Main/Main";
import { ItemModal } from "./ItemModal/ItemModal";
import { ModalWithForm } from "./ModalWithForm/ModalWithForm";
import { AddGarmentModal } from "./Forms/AddGarmentModal";
import { api } from "../utils/weatherApi";
import { mockApi } from "../utils/restApi";
import { location, API_KEY } from "../utils/constants";
import { defaultClothingItems } from "../utils/clothingitems";
import { CurrentTemperatureUnitContext } from "../context/CurrentTemperatureUnitContext";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [activeModal, setActiveModal] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
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

  useEffect(() => {
    mockApi
      .getItems()
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="App">
      <div className="App__content">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <Header
            weatherData={weatherData}
            handleAddClick={() => setActiveModal("create")}
          />
          <Main
            weatherData={weatherData}
            cards={defaultClothingItems}
            onCardClick={handleCardClick}
          />
          <Footer />
        </CurrentTemperatureUnitContext.Provider>
      </div>
      {activeModal === "create" && (
        <ModalWithForm
          title="New Garment"
          name="create"
          buttonText="Add garment"
          closeModal={closeAllPopups}
        >
          <AddGarmentModal />
        </ModalWithForm>
      )}
      {activeModal === "preview" && (
        <ItemModal card={selectedCard} onClose={closeAllPopups} />
      )}
    </div>
  );
}

export default App;
