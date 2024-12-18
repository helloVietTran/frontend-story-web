import axiosInstance from "./axiosConfig";

const userPrefix = "/users";

export const createUser = async (data) => {
    const res = await axiosInstance.post(`${userPrefix}/register`, data);
    return res.data.result;
};

export const getMyInfo = async () => {
    const res = await axiosInstance.get(`${userPrefix}/my-info`);

    return res.data.result;

}

export const getTopUsers = async () => {
    const res = await axiosInstance.get(`${userPrefix}/top-user`);

    return res.data.result;
}

export const followStory = async (storyId) => {
    const { data } = await axiosInstance.post(`${userPrefix}/follow`, {
        storyId
    });

    return data.result;
}

export const unfollowStory = async ({ storyId, followId }) => {

    await axiosInstance.delete(`${userPrefix}/unfollow/${storyId}/${followId}`);
}

export const updateUserInfo = async ({ userId, infoData }) => {

    const name = infoData.newSurName + " " + infoData.newUserName;
    const updateData = {
        name: name === " " ? null : name,
        gender: !infoData.gender || "MALE"
    }

    const { data } = await axiosInstance.put(`${userPrefix}/${userId}`, updateData);

    return data.result;

}

export const uploadAvatar = async (formData) => {
    const userId = formData.get('userId');

    const { data } = await axiosInstance.patch(`${userPrefix}/${userId}/upload-avatar`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return data.result;
}

export const changePassword = async (changePasswordData) => {
    await axiosInstance.patch(`${userPrefix}/change-password`, changePasswordData);
}   


export const forgotPassword = async (email) => {
    await axiosInstance.post(`${userPrefix}/forgot-password`, email);
    
}
export const resetPassword = async(data) => {
    console.log(data);
    await axiosInstance.patch(`${userPrefix}/reset-password`, data);
}
