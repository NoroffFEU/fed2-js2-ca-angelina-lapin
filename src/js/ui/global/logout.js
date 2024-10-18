import { onLogout } from '../auth/logout.js';

export function setLogoutListener() {
  const logoutButton = document.getElementById('logoutButton');

  if (logoutButton) {
    console.log('Logout button found, adding event listener.');
    logoutButton.addEventListener('click', onLogout);
  } else {
    console.warn('Logout button not found on the page.');
  }
}
