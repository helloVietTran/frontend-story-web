import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from "./ListFrame.module.scss";

const cx =  classNames.bind(styles);

const ListFrame = ({children}) => {
  return (
    <div className={cx('list-frame')}>
        {children}
    </div>
  )
}
ListFrame.propTypes = {
    children: PropTypes.node.isRequired,
}
export default ListFrame;
