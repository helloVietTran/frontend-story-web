import axiosInstance from "./axiosConfig";

const levelPrefix = "/level";

export const increaseExperence = async (chapterId) => {
    await axiosInstance.patch(`${levelPrefix}/chapters/${chapterId}`)
}