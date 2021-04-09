import Cookies from "js-cookie"

import { __auth_token_cookie__ } from "@/config"
import { User } from "@interfaces/user"
import apiService from "@services/api"

export type LoginInput = {
  email: string
  password: string
}

type LoginResponse = {
  user: User
  token: string
}

type OkResponse = LoginResponse

const authService = {
  async login(inputData: LoginInput) {
    const response = await apiService.post("/login", inputData)
    const data = response.data as LoginResponse

    Cookies.set(__auth_token_cookie__, data.token)

    return data.user
  },

  async logout() {
    Cookies.remove(__auth_token_cookie__)
  },

  async ok() {
    const response = await apiService.get("/ok")
    const data = response.data as OkResponse
    return data.user
  },
}

export default authService
