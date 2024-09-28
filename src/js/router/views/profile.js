import { authGuard } from "../../utilities/authGuard.js";
import { readProfile } from "../../api/profile/read.js";
import { loadUserPosts } from "../../api/post/read.js";
import router from "../../router/index.js";
import { deletePost } from "../../api/post/delete.js";

export async function renderProfile() {
  authGuard();

  const app = document.getElementById("app");
  if (!app) {
    console.error("Element with id 'app' not found.");
    return;
  }

  const username = localStorage.getItem("username");

  if (!username) {
    alert("Username not found. Redirecting to login.");
    window.location.href = "/auth/login/index.html";
    return;
  }

  try {
    const profileResponse = await readProfile(username);
    const profile = profileResponse.data;

    const avatarUrl =
      profile.avatar && profile.avatar.url
        ? profile.avatar.url
        : "https://via.placeholder.com/150";
    const avatarAlt =
      profile.avatar && profile.avatar.alt
        ? profile.avatar.alt
        : `${profile.name}'s Avatar`;

    app.innerHTML = `
      <h1>${username}'s Profile</h1>
      <img src="${avatarUrl}" alt="${avatarAlt}" width="150">
      <div><strong>Bio:</strong> ${profile.bio || "No bio available"}</div>
      <button id="createPostButton">Create Post</button>
      <div id="postsContainer"><h2>Posts</h2></div>
    `;

    document
      .getElementById("createPostButton")
      .addEventListener("click", () => {
        window.location.href = "/post/create/";
      });

    const postsResponse = await loadUserPosts(username);
    const posts = postsResponse.data;

    const postsContainer = document.getElementById("postsContainer");

    if (posts.length === 0) {
      postsContainer.innerHTML += "<p>No posts available</p>";
    } else {
      postsContainer.innerHTML += posts
        .map(
          (post) => `
         <div class="post-card" data-post-id="${post.id}">
            <div class="post-content">
              <h2>${post.title}</h2>
              <p>${post.body}</p>
            </div>
            <div class="post-actions">
              <button class="edit-post" data-post-id="${post.id}">Edit Post</button>
              <button class="delete-post" data-post-id="${post.id}">Delete Post</button>
              <button class="go-to-post" data-post-id="${post.id}">Go to Post</button>
            </div>
          </div>
      `
        )
        .join("");

      document.querySelectorAll(".edit-post").forEach((button) => {
        button.addEventListener("click", (e) => {
          const postId = e.target.getAttribute("data-post-id");
          window.location.href = `/post/edit/index.html?id=${postId}`;
        });
      });

      document.querySelectorAll(".delete-post").forEach((button) => {
        button.addEventListener("click", async (e) => {
          const postId = e.target.getAttribute("data-post-id");
          if (confirm("Are you sure you want to delete this post?")) {
            try {
              await deletePost(postId);
              await renderProfile();
              alert("Post deleted successfully");
            } catch (error) {
              console.error("Error deleting post:", error);
              alert("Failed to delete post");
            }
          }
        });
      });

      document
        .querySelectorAll(".go-to-post, .post-card")
        .forEach((element) => {
          element.addEventListener("click", (e) => {
            const postId = e.target
              .closest(".post-card")
              .getAttribute("data-post-id");
            window.history.pushState({}, "", `/post/view/?id=${postId}`);
            router();
          });
        });
    }
  } catch (error) {
    console.error("Error rendering profile:", error);
    app.innerHTML = "<p>Failed to load profile data.</p>";
  }
}

document.addEventListener("DOMContentLoaded", renderProfile);
