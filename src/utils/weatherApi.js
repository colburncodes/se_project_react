class Api {
  constructor({ baseUrl, apiKey }) {
    this._baseUrl = baseUrl;
    this._apiKey = apiKey;
  }

  _handleResponse(response) {
    return response.ok
      ? response.json()
      : Promise.reject(`Error: ${response.status} ${response.statusText}`);
  }

  getWeatherData = async (location, apiKey) => {
    const response = await fetch(
      `${this._baseUrl}lat=${location.lat}&lon=${location.lon}&units=imperial&appid=${apiKey}`
    );
    return this._handleResponse(response);
  };

  getForecastWeather = (location, apiKey) => {
    const parsedLocation = `${location.latitude}, ${location.longitude}`;
    return fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${parsedLocation}&days=1`
    ).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return this._handleResponse(res);
      }
    });
  };
}

export default Api;
