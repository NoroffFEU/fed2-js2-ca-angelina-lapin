import { onRegister } from "../../ui/auth/register.js";

export function renderRegister() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <h1>Register</h1>
    <form name="register">
      <div>
        <label for="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          required
          maxlength="20"
          pattern="^[\\w]+$"
          title="Please enter a username using only letters and numbers"
        />
      </div>

      <div>
        <label for="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          required
          pattern="^[\\w\\-.]+@(stud\\.)?noroff\\.no$"
          title="Please enter a valid noroff.no or stud.noroff.no address"
        />
      </div>

      <div>
        <label for="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          minlength="8"
        />
      </div>

      <a href="/auth/login/">Login</a>
      <button type="submit">Register</button>
    </form>
  `;

  const form = document.forms.register;
  form.addEventListener("submit", onRegister);
}
