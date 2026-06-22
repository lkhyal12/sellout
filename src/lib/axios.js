import axios from "axios";
import { useAuthStore } from "../store/authStore";
// import { getErrorMsg } from "./utils";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
let isRfreshing = false;
let refreshPromise = null;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config || {};
    originalRequest.headers = originalRequest.headers || {};
    if (
      error?.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/auth/refresh"
    ) {
      originalRequest._retry = true;
      try {
        if (!isRfreshing) {
          isRfreshing = true;
          refreshPromise = axiosInstance
            .get("/auth/refresh")
            .then((response) => {
              const newAccessToken = response.data.accessToken;
              useAuthStore.setState({ accessToken: newAccessToken });
              return newAccessToken;
            })
            .finally(() => {
              isRfreshing = false;
            });
        }

        const newAccessToken = await refreshPromise;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        // const errMsg = getErrorMsg(err);
        useAuthStore.setState({
          user: null,
          isAdmin: false,
          accessToken: null,
        });
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  },
);
export default axiosInstance;
