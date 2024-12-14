import axiosConfig from "./axiosConfig";

export const likeComment = async(commentId) => {
    await axiosConfig.post(`/like/${commentId}`);

}

export const dislikeComment = async (commentId) => {
    await axiosConfig.post(`/dislike/${commentId}`);
}