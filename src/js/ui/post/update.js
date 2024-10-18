import { updatePost } from '../../api/post/update.js';

export async function onUpdatePost(event) {
  event.preventDefault();

  const postId = new URLSearchParams(window.location.search).get('id');
  const title = document.getElementById('title').value.trim();
  const body = document.getElementById('body').value.trim();
  const tags = document.getElementById('tags').value.trim();
  const media = document.getElementById('media').value.trim();

  try {
    const data = await updatePost(postId, { title, body, tags, media });

    window.location.href = '/post/';
  } catch (error) {
    console.error('Error updating post:', error);
    alert(error.message);
  }
}
