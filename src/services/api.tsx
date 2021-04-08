import axios from "axios"
import Cookies from "js-cookie"

import { __api_url__, __auth_token_cookie__ } from "@/config"

export default function createApiService() {
  return axios.create({
    baseURL: __api_url__,
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${Cookies.get(__auth_token_cookie__)}`,
    },
  })
}
