import API from "../axios/API";

export const incrViewCount = (storyId) => API.put(`/view-count/${storyId}/increase`);