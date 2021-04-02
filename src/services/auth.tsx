import { User } from "@interfaces/user"
import apiService from "@services/api"

export type LoginInput = {
  email: string
  password: string
}

type LoginResponse = {
  user: User
}

const authService = {
  async login(loginData: LoginInput) {
    const response = await apiService.post("/login", loginData)
    const data = response.data as LoginResponse
    return data.user
  },

  async logout() {
    await apiService.get("logout")
  },
}

export default authService
