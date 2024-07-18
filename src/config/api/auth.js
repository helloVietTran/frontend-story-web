import API from "../axios/API";

export const autoLogin = () => API.get("/auth/auto-login");

export const login = (data) => API.post("/auth/login", data);

export const register = (data) => API.post("/auth/register", data);

export const sendOtp = (email, otp) =>API.post("/auth/verify-otp", { email, otp });

export const changePassword = (data) =>API.patch("/auth/change-password", data);

export const forgotPassword = (data) =>API.post("/auth/forgot-password", data);

export const resetPassword = (data, param) =>API.post(`/auth/reset-password?ticket=${param}`, data);

export const resendOtp = (email) =>API.post("/auth/resend-otp", { email });

export const refreshToken = () => API.post("/auth/refresh-token");

export const logout = () => API.post("/auth/logout");
