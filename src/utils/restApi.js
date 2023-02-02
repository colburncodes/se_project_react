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
    const response = await fetch(`${this._baseUrl}/items`);
    return this._handleResponse(response);
  };
}

export default MockApi;

export const mockApi = new MockApi({
  baseUrl: "http://localhost:3001",
});
