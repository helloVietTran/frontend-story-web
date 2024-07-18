import { createContext } from "react";
export const FormatNumberContext = createContext({});

export const FormatNumberProvider = ({children})=>{
    const formatNumber = number => {
        if(number >= 1e9){
            return (number /1e9).toFixed(1) + 'B' 
        }
        else if(number >= 1e6){
            return (number /1e6).toFixed(0) + 'M' 
        }
        else if(number >= 1000){
            return (number /1000).toFixed(0) + 'K'
        }
        else
            return number;
        }
    return(
        <FormatNumberContext.Provider value={formatNumber}>
            {children}
        </FormatNumberContext.Provider>
    )
}

export const CaculateTimeContext= createContext({});
export const CaculateTimeProvider = ({children})=>{
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
    return(
        <CaculateTimeContext.Provider value={calculateTime}>
            {children}
        </CaculateTimeContext.Provider>
    )
}