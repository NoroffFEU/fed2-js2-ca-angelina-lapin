import { login } from "../../api/auth/login.js";

export async function onLogin(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const data = await login({ email, password });

    localStorage.setItem("token", data.data.accessToken);
    localStorage.setItem("username", data.data.name);

    window.location.href = "/profile/";
  } catch (error) {
    console.error("Login failed:", error);
    alert("Login failed. Please try again.");
  }
}
