import { useSelector } from "react-redux";
import classNames from "classnames/bind";

import styles from "./PageFrame.module.scss";
import DefaultLayout from "../DefaultLayout/DefaultLayout";

const cx = classNames.bind(styles);
// module làm khung cho trang web
function PageFrame({children}) {
    const darkTheme = useSelector(state =>state.theme.darkTheme);
  
    const dark = darkTheme ? 'dark' : '';
    const themeClasses = cx({dark});
    const backGround = darkTheme ? "dark-backGround" : "backGround";
    return ( 
        <div className={`${cx("pageFrame")} ${themeClasses}`}>
            <DefaultLayout backGround={backGround}>
                {children}
            </DefaultLayout>
        </div>
    
     );
}

export default PageFrame;