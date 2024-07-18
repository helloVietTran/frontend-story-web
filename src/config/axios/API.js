import Cookies from "js-cookie";
import axios from "axios";

const API = axios.create({
  baseURL: 'http://localhost:3001'
})


API.interceptors.request.use((req) => {
  const token = Cookies.get("jwt");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

API.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401  && !originalRequest._retry) {
      originalRequest._retry = true;// đánh dấu là đã được thử lại
      const refreshToken = Cookies.get("refreshToken");
      if (!refreshToken) {
        //option: chuyển hướng tới trang đăng nhập
        return Promise.reject(error);
      }
      const newToken = await refreshToken(); 
      API.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
      return API(originalRequest);
    }

    return Promise.reject(error);
  }
);

async function refreshToken() {
  const res = await API.post('/auth/refresh-token', {
    refreshToken: Cookies.get("refreshToken")
  });
  const newToken = res.data.token;
  Cookies.set("jwt", res.data.token, { expires: Date.now() + 30*60*1000 });
  Cookies.set("refreshToken", res.data.refreshToken, {expires: 7});
  return newToken;
}

export default API;