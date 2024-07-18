function calculateTime(time) {
    const targetTime = new Date(time);
    const targetTimeSeconds = targetTime.getTime() / 1000;

    const currentTimeSeconds = Date.now() / 1000;
    const checkSecond= currentTimeSeconds - targetTimeSeconds;
    
    if(checkSecond < 60){
        return Math.floor(checkSecond) + " giây trước"
    }
    else if(checkSecond < 3600){
        return Math.floor(checkSecond/60) + " phút trước"
    }
    else if(checkSecond < 86400){
        return Math.floor(checkSecond/3600) + " giờ trước"
    }
    else {
        return Math.floor(checkSecond/86400) + " ngày trước"
    }
}
export default calculateTime;