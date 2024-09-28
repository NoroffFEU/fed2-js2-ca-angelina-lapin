import { API_SOCIAL_PROFILES } from "../constants.js";
import { headers } from "../headers.js";
/**
 *
 * @param {string} username - The username to update the profile for
 * @param {object} params - The parameters to update a profile
 * @param {string} params.avatar - The avatar URL of the profile
 * @param {string} params.banner - The banner URL of the profile
 * @returns {Promise<object>} The updated profile
 * @throws {Error} An error
 */
export async function updateProfile(username, { avatar, banner }) {
  try {
    const response = await fetch(`${API_SOCIAL_PROFILES}/${username}`, {
      method: "PUT",
      headers: {
        ...headers(),
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        avatar,
        banner,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update profile");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
}
