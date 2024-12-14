import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";

import styles from "./GenreSelect.module.scss";
const cx = classNames.bind(styles);


const GenreSelect = ({ options }) => {
  const navigate = useNavigate();

  const handleChange = (event) => {
    const selectedOption = options.find(option => option.name === event.target.value);
    if (selectedOption) {
      navigate(selectedOption.path);
    }
  };

  return (
    <select className={cx('genre-select')} onChange={handleChange}>
      {options.map((option) => (
        <option key={option.name} value={option.name}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

GenreSelect.propTypes = {
  options: PropTypes.array.isRequired,
};
export default GenreSelect;
