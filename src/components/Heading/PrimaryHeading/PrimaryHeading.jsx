import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from "./PrimaryHeading.module.scss";
import useTheme from '@/customHook/useTheme';

const cx = classNames.bind(styles);

const PrimaryHeading = ({
  title, size, icon, top , bottom
}) => { 
  const themeClassName = useTheme(cx);
  return (
    <div 
      className={cx('primary-heading', themeClassName)} 
      style={{marginBottom: bottom + 'px', marginTop: top + 'px', fontSize: size + 'rem'}}
    >
        <h3 style={{fontSize: size + 'rem'}}>{title}</h3>
        {icon && <FontAwesomeIcon icon={icon} />}
    </div>
  )
}

PrimaryHeading.propTypes = {
  title : PropTypes.string.isRequired,
  icon: PropTypes.object,
  size: PropTypes.number.isRequired,
  top: PropTypes.number,
  bottom: PropTypes.number
}

export default PrimaryHeading;