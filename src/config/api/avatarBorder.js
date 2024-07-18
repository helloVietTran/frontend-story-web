import API from "../axios/API";

export const getAvatarBorder = () => API.get("/avatar-border/get-all");

export const buyAvatarBorder = (avatarBorderId) =>API.patch(`/avatar-border/buy/${avatarBorderId}`);