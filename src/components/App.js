import { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
import { Main } from "./Main/Main";
import { Profile } from "./Profile/Profile";
import { ItemModal } from "./ItemModal/ItemModal";
import { api } from "../utils/weatherApi";
import { mockApi } from "../utils/restApi";
import { location, API_KEY } from "../utils/constants";
import { CurrentTemperatureUnitContext } from "../context/CurrentTemperatureUnitContext";
import { AddItemModal } from "./AddItemModal/AddItemModal";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [clothingitems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleToggleSwitchChange = () =>
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");

  const closeModal = () => setActiveModal("");

  useEffect(() => {
    // Parallel execution to allow multiple async operations.
    // Simplifying error handling easier to maintain
    Promise.all([api.getWeatherData(location, API_KEY), mockApi.getItems()])
      .then(([weatherInfo, clothing]) => {
        setWeatherData(weatherInfo);
        setClothingItems(clothing);
      })
      .catch((error) => console.error(error));
  }, []);

  function handleAddItemSubmit(name, imageUrl, weather) {
    mockApi
      .addNewItem({ name, imageUrl, weather })
      .then((item) => {
        setClothingItems([item, ...clothingitems]);
        closeModal();
      })
      .catch((error) => console.error(error));
  }

  function handleDeleteItemSubmit() {
    mockApi
      .deleteItem(selectedCard.id)
      .then(() => {
        setClothingItems([
          ...clothingitems.filter((item) => item.id !== selectedCard.id),
        ]);
        setSelectedCard({});
        closeModal();
      })
      .catch((error) => console.error(error));
  }

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
              <Profile clothes={clothingitems} onCardClick={handleCardClick} />
            </Route>
          </Switch>
          <Footer />
        </div>
        {activeModal === "create" && (
          <AddItemModal
            type={"create"}
            isOpen={activeModal === "create"}
            onCloseModal={closeModal}
            onAddItem={handleAddItemSubmit}
          />
        )}
        {activeModal === "preview" && (
          <ItemModal
            isOpen={activeModal === "preview"}
            card={selectedCard}
            onClose={closeModal}
            onDelete={handleDeleteItemSubmit}
          />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
