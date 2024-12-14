import axiosInstance from "./axiosConfig";

const inventoryPrefix =  "/user-inventory";

export const getInventory = async () => {
    const { data } = await axiosInstance.get(`${inventoryPrefix}`);
    return data.result;
}