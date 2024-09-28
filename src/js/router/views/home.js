export function renderHome() {
  const app = document.getElementById("app");
  if (app) {
    app.innerHTML = `
    <h1>Home Page</h1>
    <p>Welcome to the home page!</p>
    <a href="./profile/">My Profile</a>
    <a href="./auth/login/">Login</a>
    <a href="./auth/register/">Register</a>
    <button id="logoutButton">Logout</button>
  `;
  } else {
    console.error("Element with id 'app' not found");
  }
}
