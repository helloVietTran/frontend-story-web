import React from 'react';
import classNames from 'classnames/bind';

import styles from './NotFound.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
function NotFound() {
  return (
    <div className={cx('not-found')}>
        <img src='/images/not-found/404.png' alt='not-found' />
        <h3>Oops! page not found.</h3>
        <Link to='/'>Go home</Link>
    </div>
  )
}

export default NotFound