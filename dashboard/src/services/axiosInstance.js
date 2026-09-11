import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // 1. Check raw "token" key
    let token = localStorage.getItem("token");

    // 2. Check if token is inside a stored user/auth JSON object
    if (!token) {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user") || "null");
        const storedAuth = JSON.parse(localStorage.getItem("auth") || "null");
        const storedUserInfo = JSON.parse(localStorage.getItem("userInfo") || "null");

        token = storedUser?.token || storedAuth?.token || storedUserInfo?.token;
      } catch (e) {
        // Not valid JSON, ignore
      }
    }

    // 3. Attach token if found
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn("⚠️ [axiosInstance] No auth token found in localStorage!");
    }

    return config;
  },
  (error) => Promise.reject(error)
);