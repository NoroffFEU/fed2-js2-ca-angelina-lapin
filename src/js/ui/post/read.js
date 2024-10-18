import { readPosts } from '../../api/post/read.js';

export async function displayPosts(limit = 12, page = 1, tag) {
  try {
    const postsContainer = document.getElementById('posts-container');

    if (!postsContainer) {
      console.error('Posts container not found');
      return;
    }

    const posts = await readPosts(limit, page, tag);

    postsContainer.innerHTML = '';

    posts.forEach((post) => {
      const postElement = document.createElement('div');
      postElement.classList.add('post');
      postElement.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.body}</p>
        <p><strong>Tags:</strong> ${post.tags.join(', ')}</p>
        ${
          post.media
            ? `<p><strong>Media:</strong> <img src="${post.media}" alt="Post media" /></p>`
            : ''
        }
        <a href="/post/edit/?id=${post.id}">Edit</a>
      `;
      postsContainer.appendChild(postElement);
    });
  } catch (error) {
    console.error('Error displaying posts:', error);
  }
}
