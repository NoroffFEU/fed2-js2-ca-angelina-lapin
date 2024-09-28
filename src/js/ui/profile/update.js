import { updateProfile } from "../../api/profile/update.js";

export async function onUpdateProfile(event) {
  event.preventDefault();

  const username = localStorage.getItem("username");
  if (!username) {
    alert("Username not found.");
    return;
  }

  const avatar = document.getElementById("avatar").value.trim();
  const banner = document.getElementById("banner").value.trim();

  try {
    const updatedProfile = await updateProfile(username, { avatar, banner });

    alert("Profile updated successfully!");
    window.location.href = `/profile/?username=${username}`;
  } catch (error) {
    console.error("Error updating profile:", error);
    alert("Failed to update profile: " + error.message);
  }
}
