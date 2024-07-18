import API from "../axios/API";

export const addHistory= (storyName, imgSrc, chapter, slug, storyId) =>
                        API.put("/reading-history/add-story", {storyName, imgSrc, chapter, slug, storyId});

export const deleteHistory = (id) =>API.patch(`/reading-history/delete-story/${id}`);

export const getReadingHistory = () => API.get("/reading-history");