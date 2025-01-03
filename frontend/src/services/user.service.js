// const URL = "http://localhost:8000/api";
const apiUrl = import.meta.env.VITE_API_URI;

export const register = (data) => {
  console.log(apiUrl);
  return fetch(`${apiUrl}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const login = (data) => {
  return fetch(`${apiUrl}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
