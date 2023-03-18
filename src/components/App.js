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
import { LoginModal } from "./LoginModal/LoginModal";
import { RegisterModal } from "./RegisterModal/RegisterModal";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [selectedCard, setSelectedCard] = useState(null);
  const [clothingitems, setClothingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleLoginClick = () => setIsLoginModalOpen(true);

  const handleAddClick = () => setIsAddItemModalOpen(true);

  const handleRegisterClick = () => setIsRegisterModalOpen(true);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePreviewOpen(true);
  };

  const handleToggleSwitchChange = () =>
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");

  const closeModal = () => {
    setIsImagePreviewOpen(false);
    setIsLoginModalOpen(false);
    setIsAddItemModalOpen(false);
    setIsRegisterModalOpen(false);
  };

  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

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
    setIsLoading(true);
    mockApi
      .addNewItem({ name, imageUrl, weather })
      .then((item) => {
        setClothingItems([item, ...clothingitems]);
        closeModal();
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
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
            handleAddClick={handleAddClick}
            handleLoginClick={handleLoginClick}
            handleRegisterClick={handleRegisterClick}
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
              <Profile
                clothes={clothingitems}
                handleAddClick={handleAddClick}
                onCardClick={handleCardClick}
              />
            </Route>
          </Switch>
          <Footer />
        </div>

        {isRegisterModalOpen && (
          <RegisterModal
            name="register"
            isOpen={isRegisterModalOpen}
            isLoading={isLoading}
            onCloseModal={closeModal}
          />
        )}

        {isLoginModalOpen && (
          <LoginModal
            name="login"
            isOpen={isLoginModalOpen}
            isLoading={isLoading}
            onCloseModal={closeModal}
          />
        )}

        {isAddItemModalOpen && (
          <AddItemModal
            name="create"
            isLoading={isLoading}
            isOpen={isAddItemModalOpen}
            onCloseModal={closeModal}
            onAddItem={handleAddItemSubmit}
          />
        )}

        {isImagePreviewOpen && (
          <ItemModal
            isOpen={isImagePreviewOpen}
            card={selectedCard}
            onCloseModal={closeModal}
            onDelete={handleDeleteItemSubmit}
          />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
