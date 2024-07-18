import API from "../axios/API";

export const getStory = (storyID) => API.get(`/stories/${storyID}`);

export const getFollowedStories = () => API.get("/stories/followed-story");// cần đổi đường dẫn

export const getTopStory = () => API.get("/stories/top-story");

export const getUnReadStories = () => API.get("/stories/unread-story");

export const getStories = (queryField, page) =>
  API.get(`/stories?queryField=${queryField}/&page=${page}`);

export const getTotalStories = (queryField) => API.get(`/stories/total?queryField=${queryField}`);

export const queryStoriesAdvanced = (
    genreParam,
    notgenreParam,
    genderParam,
    minchapterParam,
    sortByParam
  ) =>
    API.get(
      `/stories/find-advanced?genre=${genreParam}&notgenre=${notgenreParam}&gender=${genderParam}
      &status=${genderParam}&minchapter=${minchapterParam}&sortBy=${sortByParam}`
    );
    
export const searchStory = (searchParam)=> API.get(`/stories/search?name=${searchParam}`);
  
export const queryStory = (genreParam, status, sort ) => API.get(`stories/genres?genre=${genreParam}&status=${status}&sort=${sort}`)
