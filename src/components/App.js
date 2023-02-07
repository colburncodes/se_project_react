import { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
import { Main } from "./Main/Main";
import { Profile } from "./Profile/Profile";
import { ItemModal } from "./ItemModal/ItemModal";
import { ModalWithForm } from "./ModalWithForm/ModalWithForm";
import { AddGarmentModal } from "./Forms/AddGarmentModal";
import { api } from "../utils/weatherApi";
import { mockApi } from "../utils/restApi";
import { location, API_KEY } from "../utils/constants";
import { CurrentTemperatureUnitContext } from "../context/CurrentTemperatureUnitContext";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [activeModal, setActiveModal] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [clothingitems, setClothingItems] = useState([]);
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
        setClothingItems(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="App">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="App__content">
          <Header
            weatherData={weatherData}
            handleAddClick={() => setActiveModal("create")}
          />
          <Switch>
            <Route exact path="/">
              <Main
                weatherData={weatherData}
                cards={clothingitems}
                onCardClick={handleCardClick}
              />
            </Route>
            <Route path="/profile">
              <Profile clothes={clothingitems} />
            </Route>
          </Switch>
          <Footer />
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
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
