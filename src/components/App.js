import { useState, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { weather } from "../utils/weatherApi";
import { api } from "../utils/api";
import * as auth from "../utils/auth";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
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
    Promise.all([weather.getWeatherData(location, API_KEY), api.getItems()])
      .then(([weatherInfo, clothing]) => {
        setWeatherData(weatherInfo);
        setClothingItems(clothing);
      })
      .catch((error) => console.error(error));
  }, []);

  async function handleRegistration({ name, avatar, email, password }) {
    setIsLoading(true);
    try {
      const res = await auth.register(name, avatar, email, password);
      setIsLoggedIn(true);
      setCurrentUser(res);
      closeModal();
    } catch (err) {
      return console.error(err);
    }
  }

  async function handleUserLogin(email, password) {
    setIsLoading(true);
    try {
      const res = await auth.login(email, password);
      if (res) {
        setIsLoggedIn(true);
        setCurrentUser(res.token);
        closeModal();
      }
    } finally {
      return setIsLoading(false);
    }
  }

  function handleSignOut() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  }

  async function handleAddItemSubmit(name, imageUrl, weather) {
    setIsLoading(true);
    api
      .addItem({ name, imageUrl, weather })
      .then((item) => {
        setClothingItems([item, ...clothingitems]);
        closeModal();
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }

  function handleDeleteItemSubmit() {
    api
      .deleteItem(selectedCard._id)
      .then(() => {
        setClothingItems([
          ...clothingitems.filter((item) => item._id !== selectedCard._id),
        ]);
        setSelectedCard({});
        closeModal();
      })
      .catch((error) => console.error(error));
  }

  // check for a JWT when mounting `App`
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      setIsLoggedIn(true);
      auth
        .getUser(token)
        .then((res) => {
          if (res.ok) {
            console.log(res);
            setCurrentUser(res);
          }
        })
        .catch((err) => console.error(err.message));
    }
  }, [isLoggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <Header
            isLoggedIn={isLoggedIn}
            weatherData={weatherData}
            currentUser={currentUser}
            handleAddClick={handleAddClick}
            handleLoginClick={handleLoginClick}
            handleRegisterClick={handleRegisterClick}
            handleSignOut={handleSignOut}
          />
          <Switch>
            <Route exact path="/">
              <Main
                isLoggedIn={isLoggedIn}
                weatherData={weatherData}
                cards={clothingitems}
                onCardClick={handleCardClick}
              />
            </Route>
            <ProtectedRoute
              path="/profile"
              loggedIn={isLoggedIn}
              currentUser={currentUser}
            >
              <Profile
                isLoggedIn={isLoggedIn}
                currentUser={currentUser}
                clothes={clothingitems}
                handleAddClick={handleAddClick}
                onCardClick={handleCardClick}
              />
            </ProtectedRoute>
            <Route>
              {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
            </Route>
          </Switch>
          <Footer />

          {isRegisterModalOpen && (
            <RegisterModal
              form="register"
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
              handleToggleModal={handleToggleModal}
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
    </CurrentUserContext.Provider>
  );
}

export default App;
