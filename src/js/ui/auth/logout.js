export function onLogout() {
  localStorage.removeItem('token');
  window.location.assign('/auth/login/');
}
