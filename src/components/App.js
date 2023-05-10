import { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { weather } from "../utils/weatherApi";
import { api } from "../utils/api";
import * as auth from "../utils/auth";
import { location, API_KEY } from "../utils/constants";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { CurrentTemperatureUnitContext } from "../context/CurrentTemperatureUnitContext";

import Container from "@mui/material/Container";

import {
  Header,
  Main,
  Profile,
  Footer,
  ProtectedRoute,
  RegisterModal,
  LoginModal,
  AddItemModal,
  EditProfileModal,
  ItemModal,
} from "./index";

import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [selectedCard, setSelectedCard] = useState(null);
  const [clothingitems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [showFormError, setShowFormError] = useState(false);
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const history = useHistory();

  const handleAddClick = () => setIsAddItemModalOpen(true);

  const handleProfileClick = () => setIsProfileModalOpen(true);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePreviewOpen(true);
  };

  const handleFormError = () => {
    setShowFormError(false);
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
    setActiveModal("");
    setIsImagePreviewOpen(false);
    setIsAddItemModalOpen(false);
    setIsProfileModalOpen(false);
  };

  async function handleRegistration({ name, avatar, email, password }) {
    setIsLoading(true);
    try {
      const res = await auth.register(name, avatar, email, password);
      setIsLoggedIn(true);
      handleLogin(email, password);
      setCurrentUser(res);
      closeModal();
    } catch (err) {
      return console.error(err);
    } finally {
      return setIsLoading(false);
    }
  }

  async function handleLogin(email, password) {
    setIsLoading(true);
    setShowFormError(false);
    try {
      const res = await auth.login(email, password);
      if (res) {
        setIsLoggedIn(true);
        setCurrentUser(res.token);
        closeModal();
      }
    } catch (err) {
      setShowFormError(true);
      return console.error(err);
    } finally {
      return setIsLoading(false);
    }
  }

  function handleSignOut(e) {
    e.preventDefault();
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setCurrentUser({});
    history.push("/");
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

  function handleEditProfile({ name, avatar, token }) {
    setIsLoading(true);
    auth
      .updateUser(name, avatar, token)
      .then((res) => {
        setCurrentUser(res);
        closeModal();
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }

  function handleLikeClick(id, isLiked) {
    isLiked
      ? api
          .addCardLike(id)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((c) => (c._id === id ? updatedCard : c))
            );
          })
          .catch((err) => console.error(err))
      : api
          .removeCardLike(id)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((c) => {
                return c._id === id ? updatedCard : c;
              })
            );
          })
          .catch((err) => console.error(err));
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

  // check for a JWT when mounting `App`
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      setIsLoggedIn(true);
      auth
        .getUser(token)
        .then((res) => {
          setCurrentUser(res.data);
        })
        .catch((err) => console.error(err.message));
    }
  }, [isLoggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Container>
        <div className="App">
          <CurrentTemperatureUnitContext.Provider
            value={{ currentTemperatureUnit, handleToggleSwitchChange }}
          >
            <Header
              isLoggedIn={isLoggedIn}
              weatherData={weatherData}
              onAddClick={handleAddClick}
              onLoginClick={() => setActiveModal("login")}
              onRegisterClick={() => setActiveModal("register")}
            />
            <Switch>
              <Route exact path="/">
                <Main
                  isLoggedIn={isLoggedIn}
                  weatherData={weatherData}
                  cards={clothingitems}
                  onCardClick={handleCardClick}
                  handleLikeClick={handleLikeClick}
                />
              </Route>
              <ProtectedRoute
                path="/profile"
                loggedIn={isLoggedIn}
                currentUser={currentUser}
              >
                <Profile
                  isLoggedIn={isLoggedIn}
                  cards={clothingitems}
                  currentUser={currentUser}
                  onAddClick={handleAddClick}
                  onCardClick={handleCardClick}
                  onProfileClick={handleProfileClick}
                  onSignOut={handleSignOut}
                  handleLikeClick={handleLikeClick}
                />
              </ProtectedRoute>
            </Switch>
            <Footer />
            {activeModal === "register" && (
              <RegisterModal
                type={"register"}
                isOpen={activeModal === "register"}
                isLoading={isLoading}
                onCloseModal={closeModal}
                onRegistration={handleRegistration}
                handleToggleModal={handleToggleModal}
              />
            )}

            {activeModal === "login" && (
              <LoginModal
                type={"login"}
                isOpen={activeModal === "login"}
                isLoading={isLoading}
                onCloseModal={closeModal}
                onLogin={handleLogin}
                showFormError={showFormError}
                setShowFormError={handleFormError}
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

            {isProfileModalOpen && (
              <EditProfileModal
                name="edit"
                currentUser={currentUser}
                isLoading={isLoading}
                isOpen={isProfileModalOpen}
                onCloseModal={closeModal}
                onEditProfile={handleEditProfile}
              />
            )}

            {isImagePreviewOpen && (
              <ItemModal
                isLoggedIn={isLoggedIn}
                currentUser={currentUser}
                isOpen={isImagePreviewOpen}
                card={selectedCard}
                onCloseModal={closeModal}
                onDelete={handleDeleteItemSubmit}
              />
            )}
          </CurrentTemperatureUnitContext.Provider>
        </div>
      </Container>
    </CurrentUserContext.Provider>
  );
}

export default App;
