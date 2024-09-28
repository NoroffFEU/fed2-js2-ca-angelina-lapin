export function renderNotFound() {
  const app = document.getElementById("app");
  if (!app) {
    console.error("Element with id 'app' not found in the DOM.");
    return;
  }

  app.innerHTML = `
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <a href="/">Go back to home</a>
  `;
}
