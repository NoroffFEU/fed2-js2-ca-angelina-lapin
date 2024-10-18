import 'whatwg-fetch';
import { onLogin } from '../src/js/ui/auth/login';

import { onLogout as logout } from '../src/js/ui/auth/logout';

const mockLocalStorage = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => (store[key] = value),
    removeItem: (key) => delete store[key],
    clear: () => (store = {}),
  };
})();

Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

beforeEach(() => {
  delete window.location;
  window.location = { href: '', assign: jest.fn() };
});

test('onLogin stores token in localStorage and redirects to profile', async () => {
  document.body.innerHTML = `
    <form name="login">
      <input id="email" type="email" value="testuser@example.com" />
      <input id="password" type="password" value="testpassword" />
    </form>
  `;

  const mockResponse = {
    ok: true,
    json: async () => ({
      data: {
        accessToken: 'fakeToken123',
        name: 'Test User',
      },
    }),
  };

  jest.spyOn(window, 'fetch').mockResolvedValue(mockResponse);
  const event = { preventDefault: jest.fn() };

  await onLogin(event);

  expect(localStorage.getItem('token')).toBe('fakeToken123');
  expect(localStorage.getItem('username')).toBe('Test User');

  expect(window.location.href).toBe('/profile/');
});

test('logout clears token from localStorage and redirects to login', () => {
  localStorage.setItem('token', 'fakeToken123');

  jest.spyOn(window.location, 'assign').mockImplementation(() => {});

  logout();

  expect(localStorage.getItem('token')).toBeNull();

  expect(window.location.assign).toBeCalledWith('/auth/login/');
});
