import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from "prop-types";

import useTheme from '../../customHook/useTheme';
import styles from "./TextRank.module.scss";

const cx = classNames.bind(styles);

const TextRank = ({index}) => {
  const themeClassName = useTheme(cx);

  return (
    <div className={cx(themeClassName)}>
      <span
        className={
          cx(
            "text-rank",
            `${index === 0 && "top1"}`,
            `${index === 1 && "top2"}`,
            `${index === 2 && "top3"}`
          )}
          
    >
        {index + 1 < 10 ?  `0${index + 1}` : index + 1}
    </span>
    </div>
  )
}
TextRank.propTypes = {
    index: PropTypes.number.isRequired,
}

export default TextRank