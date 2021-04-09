import axios from "axios"
import Cookies from "js-cookie"

import { __api_url__, __auth_token_cookie__ } from "@/config"

const apiService = axios.create({
  baseURL: __api_url__,
  withCredentials: true,
})

apiService.interceptors.request.use(
  (config) => {
    const token = Cookies.get(__auth_token_cookie__)
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default apiService
