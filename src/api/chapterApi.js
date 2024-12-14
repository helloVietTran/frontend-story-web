import axiosInstance from "./axiosConfig";

const storyPrefix = "/stories";

export const getChaptersBystoryId = async(storyId, page=1, size=20) => {
    const { data } = await axiosInstance.get(`${storyPrefix}/${storyId}/chapters`, 
        {
            params:{
                page, size
            }
        }
    );

    return data.result.data;
}

export const getAllChapterByStoryId = async(storyId) => {
     const {data} = await axiosInstance.get(`${storyPrefix}/${storyId}/all-chapters`);
     return data.result;
}


export const getChapterResource = async(chapterId) => {
    const {data} = await axiosInstance.get(`${storyPrefix}/chapters/${chapterId}/resource`);
    return data.result;
}


export const getChapterByStoryIdAndChap = async(storyId, chap) => {
    const { data } = await axiosInstance.get(`${storyPrefix}/${storyId}/chap`, {
        params: {
            chap
        }
    })


    return data.result;
}