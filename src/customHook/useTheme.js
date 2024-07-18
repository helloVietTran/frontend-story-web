import { useSelector } from "react-redux";

const useTheme = (cx)=> {
    const darkTheme = useSelector((state) => state.theme.darkTheme);
    const dark = darkTheme ? "dark" : "";
    return cx({ dark });
}
export default useTheme;