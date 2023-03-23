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
      if (res.status === 201) {
        return res.json();
      }
    })
    .then((res) => {
      return res;
    })
    .catch((error) => console.error(error.message));
};

export const login = async (email, password) => {
  await fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        localStorage.setItem("jwt", data.jwt);
        return data;
      }
    })
    .catch((error) => console.error(error.message));
};
