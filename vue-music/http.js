import axios from "axios";
import qs from "Qs";
const http = axios.create({
  baseURL: "http://localhost:3000",
  // baseURL: "api",
  withCredentials: false
});

export default http;
