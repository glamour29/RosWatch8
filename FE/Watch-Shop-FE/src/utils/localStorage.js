export const localStorages = {
  getToken: () => localStorage.getItem('token'),
  setToken: (token) => localStorage.setItem('token', token),
  removeToken: () => localStorage.removeItem('token'),
  getCurrentUser: () => JSON.parse(localStorage.getItem('current-user')),
  setCurrentUser: (data) => localStorage.setItem('current-user', JSON.stringify(data)),
  removeCurrentUser: () => localStorage.removeItem('current-user'),
};
