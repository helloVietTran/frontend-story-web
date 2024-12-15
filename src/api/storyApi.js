import axiosInstance from "./axiosConfig";

const storyPrefix = "/stories";

export const searchStory = async (keyword) => {
    const { data } = await axiosInstance.get(`${storyPrefix}/search`, {
        params: {
            keyword,
        }
    })
    return data.result.data;// nếu k cần phân trang
}
export const getStoriesByGender = async(gender, page = 1, size = 32) => {
    const { data } = await  axiosInstance.get(`${storyPrefix}/gender`, {
        params: {
            gender,
            page,
            size
        }
    })
    return data.result; 
}


export const getStories = async (page = 1, size = 32) => {
    const { data } =await axiosInstance.get(`${storyPrefix}`, {
        params: {
            page,
            size
        }
    })
    return data.result; 
}

export const getHotStories = async(page = 1, size = 32) => {
    const { data } = await axiosInstance.get(`${storyPrefix}/hot`, {
        params: {
            page,
            size
        }
    })

    return data.result; 
}


export const getStoryById = async(storyId) => {
    const { data } = await axiosInstance.get(`${storyPrefix}/${storyId}`);

    return data.result;
}

export const ratingStory = async (storyId, point) => {
   await axiosInstance.patch(`${storyPrefix}/${storyId}/rate`, point);
}

export const getTopStories = async () => {
    const { data } = await axiosInstance.get(`${storyPrefix}/top-views`);

    return data.result;
}

export const getMyFollowedStories = async ()=> {
    const { data } = await axiosInstance.get(`${storyPrefix}/my-followed-story`)

    return data.result;
}


export const getFollowedStoryByStoryId = async (storyId) => {
    const {data} =  await axiosInstance.get(`${storyPrefix}/my-followed-story/${storyId}`);
    
    return data.result || null;
}