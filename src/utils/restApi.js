class MockApi {
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
      },
    });
  };

  addNewItem = async ({ name, imageUrl, weather }) => {
    return await this._request(`${this._baseUrl}/items`, {
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
  };

  deleteItem = async (id) => {
    return await this._request(`${this._baseUrl}/items/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
  };
}

export default MockApi;

export const mockApi = new MockApi({
  baseUrl: "https://my-json-server.typicode.com/colburncodes/se_project_react",
});
