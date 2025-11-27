import axios, { AxiosError } from "axios";

  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    
    headers: {
      "Content-Type": "application/json",
    },
  });

    
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      delete api.defaults.headers.common['Authorization'];
      window.dispatchEvent(new CustomEvent("auth:unauthorized"));
    }
    return Promise.reject(error)
  }
)

export default api;
