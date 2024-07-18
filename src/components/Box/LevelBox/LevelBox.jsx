import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from "prop-types";

import styles from "./LevelBox.module.scss";

const cx = classNames.bind(styles);

const LevelBox = ({
    level, point, process
}) => {

  return (
    <span className={cx("level-box",  `${point && 'point-box'}`)}>
        {point !== undefined && <span className={cx("level")}>{point}</span>}
        {level !== undefined && <span className={cx("level")}>{"Cấp " + level}</span>}
        {
          process !== undefined
          &&
          <span
            className={cx("process-bar")}
            style={{ width: process + "%" }}
          ></span>
        }
    </span>
  )
}
LevelBox.propTypes = {
  level: PropTypes.number,
  point: PropTypes.number,
  process: PropTypes.number,
}

export default LevelBox