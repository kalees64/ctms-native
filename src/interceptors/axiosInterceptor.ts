import axios from "axios";

const API_BASE_URL = "";

const axiosHTTP = axios.create({
  baseURL: API_BASE_URL,
});

axiosHTTP.interceptors.request.use(
  (config) => {
    const token = "";

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosHTTP;
