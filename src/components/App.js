import { useState } from "react";
import "./App.css";
import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
import { Main } from "./Main/Main";
import { WeatherCard } from "./WeatherCard/WeatherCard";
import { defaultClothingItems } from "../utils/clothingitems";

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [activeModal, setActiveModal] = useState();

  return (
    <div className="App">
      <div className="App__content">
        <Header
          weatherData={weatherData}
          handleAddClick={() => setActiveModal("create")}
        />
        <WeatherCard />
        <Main weatherData={weatherData} cards={defaultClothingItems} />
        <Footer />
      </div>
    </div>
  );
}

export default App;
