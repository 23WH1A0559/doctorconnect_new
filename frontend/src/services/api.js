import axios from "axios";

// Create axios instance
const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

// Add token automatically (VERY IMPORTANT)
API.interceptors.request.use((req) => {

  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;