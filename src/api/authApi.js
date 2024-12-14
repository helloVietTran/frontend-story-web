import axiosInstance from "./axiosConfig";
import Cookies from "js-cookie";

const authPrefix =  "/auth";

export const login = async (credentialsData) => {
    const {data} = await axiosInstance.post(`${authPrefix}/login`, credentialsData);

    return data.result;
};

export const logout = async (token) => {
    await axiosInstance.post(`${authPrefix}/logout`, token);
    
}

export const refresh = async (refreshToken) => {
    const {data} = await axiosInstance.post(`${authPrefix}/refresh`, refreshToken);

    Cookies.set('reading_web_jwt', data.accessToken, { expires: 1 / 24 });
    Cookies.set('reading_web_refreshToken', data.refreshToken, { expires: 1 });

    return data;
};
