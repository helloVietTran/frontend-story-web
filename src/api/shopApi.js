import axiosInstance from "./axiosConfig";

const shopPrefix =  "/shop";

export const getAvatarFrame = async() => {
    const {data} = await axiosInstance.get(`${shopPrefix}/avatar-frame`);

    return data.result;
}
