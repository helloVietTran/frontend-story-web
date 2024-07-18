import React from 'react';
import classNames from "classnames/bind";
import PropTypes from 'prop-types';

import styles from "./Grid.module.scss";

const cx = classNames.bind(styles)

const Grid = ({children}) => {
  return (
    <div className={cx('grid')}>
        {children}
    </div>
  )
}

Grid.propTypes = {
    children : PropTypes.node,
}
export default Grid;