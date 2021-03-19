import axios from "axios";

import { __api_url__ } from "../config";

const baseURL = __api_url__;
console.log(__api_url__);

const api = axios.create({
  baseURL,
});

export default api;
