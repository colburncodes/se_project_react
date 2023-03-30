export const BASE_URL = "http://localhost:3001";

async function handleRequest(url, options) {
  const response = await fetch(url, options);
  return handleResponse(response);
}

const handleResponse = (response) => {
  return response.ok
    ? response.json()
    : Promise.reject(`Error: ${response.status} ${response.statusText}`);
};

export const register = async (name, avatar, email, password) => {
  return handleRequest(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then((res) => {
    return res;
  });
};

export const login = async (email, password) => {
  return handleRequest(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((data) => {
    if (data) {
      localStorage.setItem("token", data.token);
      return data;
    }
  });
};

export const getUser = () => {
  return handleRequest(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((data) => {
    return data;
  });
};

export const updateUser = async (name, avatar) => {
  return handleRequest(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then((data) => {
    if (data) {
      return data;
    }
  });
};
