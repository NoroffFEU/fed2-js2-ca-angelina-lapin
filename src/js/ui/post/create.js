import { createPost } from '../../api/post/create.js';

export async function onCreatePost(event) {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const body = document.getElementById('body').value;
  const tags = document.getElementById('tags').value;
  const mediaUrl = document.getElementById('mediaUrl').value;
  const mediaAlt = document.getElementById('mediaAlt').value;

  if (mediaUrl && !isValidUrl(mediaUrl)) {
    alert('Please enter a valid media URL.');
    return;
  }

  try {
    await createPost({ title, body, tags, mediaUrl, mediaAlt });
    window.location.href = '/profile/';
  } catch (error) {
    console.error('Error creating post:', error);
    alert('Failed to create post');
  }
}

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}
