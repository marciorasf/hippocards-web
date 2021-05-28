import apiService from "@services/api"

export type CreateUserInput = {
  email: string
  password: string
}

type CreateUserResponse = {
  userId: number
}

const userService = {
  async create(inputData: CreateUserInput) {
    const response = await apiService.post("users", inputData)
    const data = response.data as CreateUserResponse
    return data.userId
  },

  async requestRecoverPassword(email: string) {
    await apiService.post("recover-password", {
      email,
    })
    return true
  },

  async verifyRecoverPasswordToken(token: string) {
    await apiService.get(`recover-password-token/${token}`)
    return true
  },
}

export default userService
