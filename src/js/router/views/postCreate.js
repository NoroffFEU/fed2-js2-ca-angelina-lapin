import { onCreatePost } from '../../ui/post/create.js';
import { authGuard } from '../../utilities/authGuard.js';

export function renderPostCreate() {
  authGuard();

  const app = document.getElementById('app');
  if (!app) {
    console.error("Element with id 'app' not found.");
    return;
  }

  app.innerHTML = `
    <h1>Create Post</h1>

   <form name="createPost">
  <div>
    <label for="title">Title</label>
    <input id="title" type="text" name="title" required />
  </div>

  <div>
    <label for="body">Body</label>
    <textarea id="body" name="body" required></textarea>
  </div>

  <div>
    <label for="tags">Tags (comma separated)</label>
    <input id="tags" type="text" name="tags" placeholder="tag1, tag2" />
  </div>

  <div>
    <label for="mediaUrl">Media URL</label>
    <input id="mediaUrl" type="url" name="mediaUrl" placeholder="https://example.com/image.jpg" />
  </div>

  <div>
    <label for="mediaAlt">Media Alt Text</label>
    <input id="mediaAlt" type="text" name="mediaAlt" placeholder="Description of the image" />
  </div>

  <button type="submit">Create Post</button>
</form>

  `;

  const form = document.forms['createPost'];
  if (form) {
    form.addEventListener('submit', onCreatePost);
  } else {
    console.error('Create post form not found.');
  }
}
