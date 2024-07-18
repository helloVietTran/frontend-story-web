import API from "../axios/API";

export const reportErrorChapter = (storyName, atChapter, type, description)=> 
                                    API.post("/error-reporter", {storyName, atChapter, type, description});