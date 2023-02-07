class MockApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _handleResponse(response) {
    return response.ok
      ? response.json()
      : Promise.reject(`Error: ${response.status} ${response.statusText}`);
  }

  getItems = async () => {
    const response = await fetch(`${this._baseUrl}/items`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return this._handleResponse(response);
  };

  adddNewItem = async ({ name, imageUrl, weather }) => {
    const response = await fetch(`${this._baseUrl}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        imageUrl,
        weather,
      }),
    });
    return this._handleResponse(response);
  };

  deleteItem = async (id) => {
    const response = await fetch(`${this._baseUrl}/items/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
    return this._handleResponse(response);
  };
}

export default MockApi;

export const mockApi = new MockApi({
  baseUrl: "http://localhost:3001",
});
