import axiosInstance from "./axiosConfig";

const readingHistoryPrefix = "/reading-history";

// send int chaptersRead, storyId 
export const updateReadingHistory = async (data)=> {
    await axiosInstance.put(`${readingHistoryPrefix}`,data)
}

export const getMyReadingHistory = async ()=> {
   const {data} = await axiosInstance.get(`${readingHistoryPrefix}/my`);
   return data.result || null;
}

export const deleteReadingHistory = async (readingHistoryId)=> {
    await axiosInstance.delete(`${readingHistoryPrefix}/${readingHistoryId}`)
}