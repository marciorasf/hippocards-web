import createApiService from "@services/api"

export type CreateUserInput = {
  email: string
  password: string
}

type CreateUserResponse = {
  userId: number
}

const userService = {
  async create(inputData: CreateUserInput) {
    const apiService = createApiService()
    const response = await apiService.post("/users", inputData)
    const data = response.data as CreateUserResponse
    return data.userId
  },
}

export default userService
