import axiosInstance from "./axiosConfig";

const commentPrefix =  "/comments";

export const getNewComment = async() => {
    const {data} = await axiosInstance.get(`${commentPrefix}/new-comments`);
    return data.result;
}

export const getMyComment = async(userId) => {
    const {data} = await axiosInstance.get(`${commentPrefix}/users/${userId}`);

    return data.result.data;
}


export const getCommentsByStoryId = async(storyId ,page , size=32) => {
    const { data } = await axiosInstance.get(`${commentPrefix}/stories/${storyId}`,{
        params: {
            page,
            size
        }
    });
    return data.result;
} 

export const getCommentsByChapterId = async(chapterId ,page , size=32) => {
    const { data } = await axiosInstance.get(`${commentPrefix}/chapters/${chapterId}`,{
        params: {
            page,
            size
        }
    });
    return data.result;
} 


export const postComment = async(data) => {
    await axiosInstance.post(`${commentPrefix}`, data);
}