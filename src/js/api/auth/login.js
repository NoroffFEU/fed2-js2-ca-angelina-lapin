import { API_AUTH_LOGIN } from "../constants.js";
import { headers } from "../headers.js";

export async function login({ email, password }) {
  try {
    const response = await fetch(API_AUTH_LOGIN, {
      method: "POST",
      headers: {
        ...headers(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Login failed");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.username);

    return data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}
