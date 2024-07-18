import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import styles from "./Input.module.scss";

const cx = classNames.bind(styles);

const Input = ({
  type,
  placeholder,
  config,
  errors,
  label,
  id,
  register,
  onChange,
}) => {
  const [isHidePassword, setIsHidePassWord] = useState(true);
  return (
    <div
      className={cx("form-input")}
      style={{ position: type === "password" ? "relative" : "unset" }}
    >
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        placeholder={placeholder}
        type={isHidePassword && type === "password" ? "password" : "text"}
        {...register(id, config)}
        className={errors.id ? cx("invalid") : cx("validate")}
        onChange={onChange}
      />
      {errors.id && <span className="error">{errors.id.message}</span>}
      {type === "password" && (
        <FontAwesomeIcon
          icon={isHidePassword ? faEye : faEyeSlash}
          onClick={() => setIsHidePassWord(!isHidePassword)}
        />
      )}
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  config: PropTypes.object,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default Input;
