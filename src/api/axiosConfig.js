import axios from "axios";
import Cookies from "js-cookie";

const backendUrl = process.env.REACT_APP_BACKEND_URL + "/api";

const axiosInstance = axios.create({
  baseURL: backendUrl,
  timeout: 10000,
});

let isRefreshing = false; // status refreshing token
let refreshPromise = null; // Promise for refresh token

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("reading_web_jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {

    // if error =  401
    if (error.response && error.response.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const refreshToken = Cookies.get("reading_web_refresh_token");
          if (!refreshToken) {
            throw new Error("Refresh token not found");
          }

          // refresh token
          const { data } = await axios.post(`${backendUrl}/auth/refresh`, {
            refreshToken,
          });

          const { accessToken } = data;

          // save new token
          Cookies.set("reading_web_jwt", accessToken, { expires: 1 / 24 });
          Cookies.set("reading_web_refresh_token", refreshToken, { expires: 1 });

          isRefreshing = false;
          refreshPromise = null;
          
          return Promise.resolve(); 
        } catch (err) {
          console.error("Refresh token failed. Redirecting to login.");

          window.location.href = "/login";
          isRefreshing = false;
          refreshPromise = null;
          
          return Promise.reject(err);
        }
      }

      // Nếu đã có request refresh đang chạy, đợi nó hoàn thành
      if (!refreshPromise) {
        refreshPromise = new Promise((resolve, reject) => {
          const interval = setInterval(() => {
            if (!isRefreshing) {
              clearInterval(interval);
              resolve();
            }
          }, 50);
        });
      }

      return refreshPromise.then(() => Promise.resolve()).catch(() => Promise.reject(error));
    }

    return Promise.reject(error);
  }
); 

export default axiosInstance;
