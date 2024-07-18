import classNames from 'classnames/bind';
import PropTypes from "prop-types";

import styles from "./DefaultLayout.module.scss";
import useTheme from "../../../customHook/useTheme";

const cx = classNames.bind(styles);
function DefaultLayout({children}) {
   const themeClassName = useTheme(cx);
    return ( 
        <div className={cx('default-layout', themeClassName)}>    
                 {children}  
        </div>
     )
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired
}

export default DefaultLayout;