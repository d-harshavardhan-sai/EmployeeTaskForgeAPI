import axios from "axios";

const API = axios.create({
  baseURL: "https://employeetaskforgeapi.onrender.com/api", 
});

// Attach JWT token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
