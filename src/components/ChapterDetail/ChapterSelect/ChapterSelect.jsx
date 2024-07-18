import React from 'react';
import PropTypes from "prop-types";
import classNames from "classnames/bind";

import styles from "./ChapterSelect.module.scss";

const cx = classNames.bind(styles);

const ChapterSelect = ({
    currentChapter,
    lastChap,
    handleChangeSelectedChap,
  }) => {
    const makeOptions = () => {
      const options = [];
      for (let i = 1; i <= lastChap; i++) {
        options.push(
          <option key={i} value={i}>
            Chapter {i}
          </option>
        );
      }
      return options;
    };
  
    return (
      <select
        value={currentChapter}
        className="selected-chapter"
        onChange={handleChangeSelectedChap}
      >
        {makeOptions()}
      </select>
    );
  };

ChapterSelect.propTypes = {
  currentChapter: PropTypes.number.isRequired,
  lastChap: PropTypes.number.isRequired,
  handleChangeSelectedChap: PropTypes.func.isRequired,
}

export default ChapterSelect;