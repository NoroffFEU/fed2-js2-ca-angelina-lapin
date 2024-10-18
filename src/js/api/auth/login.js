import { API_AUTH_LOGIN } from '../constants.js';
/**
 *
 * @param {object} params - The parameters to login a user
 * @param {string} params.email - The email of the user
 * @param {string} params.password - The password of the user
 * @returns {Promise<object>} The logged in user
 * @throws {Error} An error
 */
export async function login({ email, password }) {
  try {
    const response = await fetch(API_AUTH_LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Login API error:', error);
      throw new Error(error.message || 'Login failed');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
}
