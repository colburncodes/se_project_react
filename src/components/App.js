import { useState, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { api } from "../utils/weatherApi";
import { mockApi } from "../utils/restApi";
import * as auth from "../auth";
import { location, API_KEY } from "../utils/constants";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { CurrentTemperatureUnitContext } from "../context/CurrentTemperatureUnitContext";

import {
  Header,
  Main,
  Profile,
  Footer,
  ProtectedRoute,
  RegisterModal,
  LoginModal,
  AddItemModal,
  ItemModal,
} from "./index";

import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [selectedCard, setSelectedCard] = useState(null);
  const [clothingitems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

  const handleToggleModal = () => {
    activeModal === "login"
      ? setActiveModal("register")
      : setActiveModal("login");
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

  function handleRegistration({ name, avatar, email, password }) {
    setIsLoading(true);
    return auth
      .register(name, avatar, email, password)
      .then((res) => {
        setIsLoggedIn(true);
        setCurrentUser(res);
        closeModal();
      })
      .catch((err) => console.error(err));
  }

  function handleUserLogin(email, password) {
    setIsLoading(true);
    return auth
      .login(email, password)
      .then((res) => {
        setIsLoggedIn(true);
        setCurrentUser(res);
        closeModal();
      })
      .finally(() => setIsLoading(false));
  }

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
      <CurrentUserContext.Provider value={currentUser}>
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <Header
            isLoggedIn={isLoggedIn}
            weatherData={weatherData}
            handleAddClick={handleAddClick}
            handleLoginClick={handleLoginClick}
            handleRegisterClick={handleRegisterClick}
          />
          <Switch>
            {/* <ProtectedRoute exact path="/" loggedIn={isLoggedIn}> */}
            <Route exact path="/">
              <Main
                weatherData={weatherData}
                cards={clothingitems}
                onCardClick={handleCardClick}
              />
            </Route>
            {/* </ProtectedRoute> */}
            <ProtectedRoute path="/profile" loggedIn={isLoggedIn}>
              <Profile
                clothes={clothingitems}
                handleAddClick={handleAddClick}
                onCardClick={handleCardClick}
              />
            </ProtectedRoute>
            <Route path="/signup">
              <RegisterModal />
            </Route>
            <Route path="/signin">
              <LoginModal />
            </Route>
            <Route>
              {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
            </Route>
          </Switch>
          <Footer />

          {isRegisterModalOpen && (
            <RegisterModal
              isOpen={isRegisterModalOpen}
              isLoading={isLoading}
              onCloseModal={closeModal}
              handleRegistration={handleRegistration}
            />
          )}

          {isLoginModalOpen && (
            <LoginModal
              name="login"
              isOpen={isLoginModalOpen}
              isLoading={isLoading}
              onCloseModal={closeModal}
              handleUserLogin={handleUserLogin}
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
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
