import API from "../axios/API";

export const getPoint = () => API.get("/point/get-point");

export const attendance = () => API.put("/point/attendance");