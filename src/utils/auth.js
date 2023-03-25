export const BASE_URL = "http://localhost:3001";

export const register = async (name, avatar, email, password) => {
  await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((res) => {
      return res;
    })
    .catch((error) => console.error(error.message));
};

export const login = async (email, password) => {
  return await fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        localStorage.setItem("token", data.token);
        return data;
      }
    })
    .catch((error) => console.error(error.message));
};

export const getUser = async (token) => {
  return await fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem(token)}`,
    },
  })
    .then((data) => {
      return data;
    })
    .catch((error) => console.error(error.message));
};

export const updateUser = async (name, avatar, about) => {
  return await fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, about }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        return data;
      }
    })
    .catch((err) => console.error(err.message));
};
