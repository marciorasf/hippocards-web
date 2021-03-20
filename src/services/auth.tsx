import apiService from "./api";

type LoginData = {
  email: string;
  password: string;
};

const authService = {
  async login(data: LoginData) {
    try {
      await apiService.post("/login", data);
      return true;
    } catch (err) {
      return false;
    }
  },

  async logout() {
    try {
      await apiService.get("logout");
      return true;
    } catch (err) {
      return false;
    }
  },
};

export default authService;
