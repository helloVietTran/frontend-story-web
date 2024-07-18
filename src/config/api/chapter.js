import API from "../axios/API";

export const getChapter = (storyId, chap) => API.get(`/chapters/${storyId}?chap=${chap}`) 