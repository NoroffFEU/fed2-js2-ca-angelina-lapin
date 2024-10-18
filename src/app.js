import router from './js/router/index.js';
import { onCreatePost } from './js/ui/post/create.js';
import { onUpdatePost } from './js/ui/post/update.js';
import { displayPosts } from './js/ui/post/read.js';
import { setLogoutListener } from './js/ui/global/logout.js';
import { onDeletePost } from './js/ui/post/delete.js';

document.addEventListener('DOMContentLoaded', async () => {
  await router(window.location.pathname);

  if (
    !window.location.pathname.includes('/auth/login/') &&
    !window.location.pathname.includes('/auth/register/')
  ) {
    setLogoutListener();
  }

  const createPostForm = document.forms['createPost'];
  if (createPostForm) {
    createPostForm.addEventListener('submit', onCreatePost);
  }

  const editPostForm = document.forms['editPost'];
  if (editPostForm) {
    editPostForm.addEventListener('submit', onUpdatePost);
  }

  if (window.location.pathname === '/post/') {
    displayPosts();

    const deleteButtons = document.querySelectorAll('button[data-post-id]');
    deleteButtons.forEach((button) => {
      button.addEventListener('click', onDeletePost);
    });
  }
});
