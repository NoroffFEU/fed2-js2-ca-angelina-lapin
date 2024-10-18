import { onLogin } from '../../ui/auth/login.js';

export function renderLogin() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <h1>Login</h1>
    <form name="login">
      <div>
        <label for="email">Email</label>
        <input id="email" type="email" name="email" required />
      </div>

      <div>
        <label for="password">Password</label>
        <input type="password" name="password" id="password" required />
      </div>

      <a href="/auth/register/">Register</a>
      <button type="submit">Login</button>
    </form>
  `;

  const form = document.forms.login;
  form.addEventListener('submit', onLogin);
}
