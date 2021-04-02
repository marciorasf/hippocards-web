import apiService from "@services/api"

export type CreateUserInput = {
  email: string
  password: string
}

type CreateUserResponse = {
  userId: number
}

const userService = {
  async create(userData: CreateUserInput) {
    const response = await apiService.post("/users", userData)
    const data = response.data as CreateUserResponse
    return data.userId
  },
}

export default userService
