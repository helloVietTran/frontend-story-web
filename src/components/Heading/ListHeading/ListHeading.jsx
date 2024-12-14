import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import useTheme from '../../../customHook/useTheme';

import PrimaryHeading from '../PrimaryHeading/PrimaryHeading';

import styles from "./ListHeading.module.scss";

const cx = classNames.bind(styles);

const ListHeading = ({title, path}) => {
  const themeClassName = useTheme(cx);
  return (
    <div className={cx('top-list-header', themeClassName)}>
        <PrimaryHeading 
            size={1.6}
            title={title}
            theme={themeClassName}
        />
        <Link to={path}>Xem tất cả</Link>
    </div>
  )
}

ListHeading.propTypes = {
    title: PropTypes.string.isRequired,
    path: PropTypes.string,
}

export default ListHeading