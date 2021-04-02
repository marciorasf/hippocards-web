import apiService from "@services/api"

type CreateInput = {
  email: string
  password: string
}

type CreateResponse = {
  userId: number
}

const userService = {
  async create(userData: CreateInput) {
    const response = await apiService.post("/users", userData)
    const data = response.data as CreateResponse
    return data.userId
  },
}

export default userService
