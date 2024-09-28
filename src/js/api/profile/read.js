import { API_SOCIAL_PROFILES } from "../constants.js";
import { headers } from "../headers.js";
/**
 *
 * @param {string} username - The username to fetch the profile for
 * @returns {Promise<object>} The profile
 * @throws {Error} An error
 */
export async function readProfile(username) {
  try {
    const response = await fetch(`${API_SOCIAL_PROFILES}/${username}`, {
      method: "GET",
      headers: headers(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to load profile");
    }

    const profile = await response.json();
    return profile;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
}
