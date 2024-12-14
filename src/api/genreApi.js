import axiosInstance from "./axiosConfig";

const genrePrefix =  "/genres";

export const getGenres = async () => {
    const {data} = await axiosInstance.get(`${genrePrefix}`);

    return data;
};