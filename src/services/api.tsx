import axios from "axios";

import { apiUrl } from "../config";

const baseURL = apiUrl;
console.log(apiUrl);

const api = axios.create({
  baseURL,
});

export default api;
