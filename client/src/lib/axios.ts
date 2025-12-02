// client/src/lib/axios.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
  if (token) {
    localStorage.setItem("persist", "true");
  } else {
    localStorage.removeItem("persist");
  }
};

export const refreshAccessToken = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/users/refresh-token`,
      {},
      { withCredentials: true }
    );

    const newAccessToken = response.data.data.accessToken;
    setAccessToken(newAccessToken);
    return newAccessToken;
  } catch (error) {
    setAccessToken(null);
    throw error;
  }
};

axiosInstance.interceptors.request.use(async (config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;