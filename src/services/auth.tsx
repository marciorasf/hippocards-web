import api from "./api";

type LoginData = {
  email: string;
  password: string;
};

export default {
  async login(data: LoginData) {
    try {
      await api.post("/login", data);
      return true;
    } catch (err) {
      return false;
    }
  },

  async logout() {
    try {
      await api.get("logout");
      return true;
    } catch (err) {
      return false;
    }
  },

  async isAuthenticated() {
    try {
      api.get("/check");
      return true;
    } catch (err) {
      return false;
    }
  },
};
