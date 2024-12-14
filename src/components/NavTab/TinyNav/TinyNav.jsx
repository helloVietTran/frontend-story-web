import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from "./TinyNav.module.scss";
import useTheme from '@/customHook/useTheme';
const cx = classNames.bind(styles);

const TinyNav = ({
    firstLabel, secondaryLabel, onClick, activeElement
}) => {
const themeClassName = useTheme(cx);
  
  return (
    <ul className={cx("nav", themeClassName)}>
        <li
            className={activeElement === "option 1" ? cx("active") : null}
            onClick={()=>onClick("option 1")}
        >
            <Link>{firstLabel}</Link>
        </li>
        <li
            className={activeElement === "option 2" ? cx("active") : null}
            onClick={()=>onClick("option 2")}
        >
            <Link>{secondaryLabel}</Link>
            <span className="dot">
                <span className="ping"></span>
            </span>
        </li>
    </ul>
  )
}
TinyNav.propTypes = {
    firstLabel: PropTypes.string,
    secondaryLabel: PropTypes.string,
    onClick: PropTypes.func,
    activeElement: PropTypes.string
}

export default TinyNav