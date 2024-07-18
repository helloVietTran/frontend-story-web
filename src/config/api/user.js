import API from "../axios/API";

export const getTopUser = () => API.get("/users/top-user");

export const markAsRead = (storyId) =>API.patch(`/users/mark-as-read/${storyId}`);

export const getCommentOfUser = () => API.get("/users/comment-of-user");

export const getUserInfo = (userId) => API.get(`/users/${userId}`);

export const upgradeLevel = (chaptersCount) => API.patch(`/users/upgrade/${chaptersCount}`);

export const followStory = (storyID) =>API.patch(`/users/follow-story/${storyID}`);

export const unFollowStory = (storyID) =>API.patch(`/users/follow-story/${storyID}`);

export const getFollowStatus = () => API.get("/users/follow-status");

export const updateUser = (data) => API.put("/users/update", data);


export const getCurrentUser = () => API.get("/users/current-user"); 
