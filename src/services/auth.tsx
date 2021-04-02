import { User } from "@interfaces/user"
import apiService from "@services/api"

export type LoginInput = {
  email: string
  password: string
}

type LoginResponse = {
  user: User
}

type OkResponse = LoginResponse

const authService = {
  async login(loginData: LoginInput) {
    const response = await apiService.post("/login", loginData)
    const data = response.data as LoginResponse
    return data.user
  },

  async logout() {
    return apiService.get("logout")
  },

  async ok() {
    const response = await apiService.get("/ok")
    const data = response.data as OkResponse
    return data.user
  },
}

export default authService
