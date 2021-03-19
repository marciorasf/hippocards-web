import cookies from "browser-cookies";

import api from "./api";

const authTokenCookieName = "@flashcards/auth-token";

async function login(data: { email: string; password: string }) {
  api.post("/authenticate", data);
}

function logout() {
  cookies.erase(authTokenCookieName);
}

function getAuthToken() {
  return cookies.get(authTokenCookieName);
}

function isAuthenticated() {
  return Boolean(getAuthToken());
}

export default {
  login,
  logout,
  isAuthenticated,
};
