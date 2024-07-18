import API from "../axios/API";

export const getComment = (storyId) => API.get(`/comment/${storyId}`);

export const createComment = (storyId, chap, content ) => API.post("/comment/create", { storyId, chap, content });

export const createReply = (commentId, replyTo, content) =>
  API.post("/comment/create-reply", { commentId, replyTo, content });

export const getNewComment = () => API.get("comment/new-comment");

export const likeComment = (commentID) => API.patch(`/comment/${commentID}/like`);

export const dislikeComment = (commentID) => API.patch(`/comment/${commentID}/dislike`);

export const likeReply = (replyID, commentID) => API.patch(`/comment/${commentID}/reply/${replyID}/like`);

export const dislikeReply = (replyID, commentID) => API.patch(`/comment/${commentID}/reply/${replyID}/dislike`);