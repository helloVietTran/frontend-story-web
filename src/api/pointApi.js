import axiosInstance from "./axiosConfig";

const pointPrefix = "/points";

export const getPoint = async () => {
    const { data } = await axiosInstance.get(`${pointPrefix}/my`);

    return data.result;
}


export const attendance = async () => {
    await axiosInstance.put(`${pointPrefix}/attendance`);
}

export const buyItem = async (buyItemData) => {
    const { data } = await axiosInstance.post(`${pointPrefix}/buy-item`, buyItemData);
    return data.result;
}