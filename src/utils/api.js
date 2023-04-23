class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _request(url, options) {
    return fetch(url, options).then(this._handleResponse);
  }

  _handleResponse(response) {
    return response.ok
      ? response.json()
      : Promise.reject(`Error: ${response.status} ${response.statusText}`);
  }

  getItems = async () => {
    return await this._request(`${this._baseUrl}/items`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  addItem = async ({ name, imageUrl, weather }) => {
    return await this._request(`${this._baseUrl}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        name,
        imageUrl,
        weather,
      }),
    });
  };

  deleteItem = async (id) => {
    return await this._request(`${this._baseUrl}/items/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        id,
      }),
    });
  };

  addCardLike = async (id) => {
    return await this._request(`${this._baseUrl}/items/${id}/likes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  removeCardLike = async (id) => {
    return await this._request(`${this._baseUrl}/items/${id}/likes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };
}

export default Api;

export const api = new Api({
  baseUrl:
    process.env.NODE_ENV === "production"
      ? "https://api.wtwr.mooo.com"
      : "http://localhost:3001",
});
