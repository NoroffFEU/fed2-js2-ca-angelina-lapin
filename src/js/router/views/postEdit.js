import { authGuard } from '../../utilities/authGuard.js';
import { getPostById } from '../../api/post/read.js';
import { updatePost } from '../../api/post/update.js';

export async function renderPostEdit(postId) {
  authGuard();

  const app = document.getElementById('app');
  if (!app) {
    console.error("Element with id 'app' not found.");
    return;
  }

  const post = await getPostById(postId);

  app.innerHTML = `
    <h1>Edit Post</h1>
    <form id="editPostForm">
      <div>
        <label for="title">Title</label>
        <input id="title" type="text" name="title" value="${
          post.title
        }" required />
      </div>

      <div>
        <label for="body">Body</label>
        <textarea id="body" name="body" required>${post.body}</textarea>
      </div>

      <div>
        <label for="tags">Tags (comma separated)</label>
        <input id="tags" type="text" name="tags" value="${post.tags.join(
          ', '
        )}" />
      </div>

      <button type="submit">Update Post</button>
    </form>
    <button id="goBackButton">Go Back</button>
    <button id="goBackHomeButton">Go Back to Homepage</button>
  `;

  document
    .getElementById('editPostForm')
    .addEventListener('submit', async (event) => {
      event.preventDefault();

      const updatedPost = {
        title: document.getElementById('title').value,
        body: document.getElementById('body').value,
        tags: document
          .getElementById('tags')
          .value.split(',')
          .map((tag) => tag.trim()),
      };

      try {
        await updatePost(postId, updatedPost);
        window.location.href = '/profile/';
      } catch (error) {
        console.error('Error updating post:', error);
        alert('Failed to update post');
      }
    });

  document.getElementById('goBackButton').addEventListener('click', () => {
    window.history.back();
  });

  document.getElementById('goBackHomeButton').addEventListener('click', () => {
    window.location.href = '/';
  });
}
