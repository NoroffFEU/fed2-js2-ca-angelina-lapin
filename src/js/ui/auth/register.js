import { register } from '../../api/auth/register.js';

export async function onRegister(event) {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  console.log('Sending data to the server:', {
    name,
    email,
    password,
  });

  if (!name || !email || !password) {
    console.error('Incorrect data: one or more fields are empty');
    alert('Please fill in all fields!');
    return;
  }

  try {
    const data = await register({
      name,
      email,
      password,
    });

    window.location.href = '/auth/login/';
  } catch (error) {
    console.error('Error during registration (UI):', error.message);
    alert('Registration error: ' + error.message);
  }
}
