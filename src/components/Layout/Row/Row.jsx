import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from "./Row.module.scss";

const cx = classNames.bind(styles);

const Row = ({children}) => {
  return (
    <div className={cx('row')}>
        {children}
    </div>
  )
}

Row.propTypes = {
    children : PropTypes.node,
}

export default Row;