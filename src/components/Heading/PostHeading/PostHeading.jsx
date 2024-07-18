import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from "./PostHeading.module.scss";
import useTheme from "@/customHook/useTheme";

const cx = classNames.bind(styles);

const PostHeading = ({ title, size, top , bottom, isRequired }) => {
  const themeClassName = useTheme(cx);
  return (
    <h2 className={cx('post-heading', themeClassName)} 
        style={{marginBottom: bottom + 'px', marginTop: top + 'px', fontSize: size + 'rem'}}
    >
        {title}
        {isRequired && (
        <span>
          (<span>*</span>) bắt buộc
        </span>
      )}
    </h2>
  )
}

PostHeading.propTypes = {
    title: PropTypes.string.isRequired,
    size: PropTypes.number,
    top: PropTypes.number,
    bottom: PropTypes.number,
    isRequired: PropTypes.bool,
}

export default PostHeading