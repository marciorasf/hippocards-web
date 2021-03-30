import axios from "axios"

import { __api_url__ } from "../config"

const apiService = axios.create({
  baseURL: __api_url__,
  withCredentials: true,
})

export default apiService
