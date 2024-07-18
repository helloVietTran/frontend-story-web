import React from "react";
import PropTypes from "prop-types";

import styles from "./Col.module.scss";

const Col = ({
  children,
  sizeXs,
  sizeXl,
  sizeLg,
  sizeMd,
  sizeSm,
  offset,
  offsetMd,
}) => {
  const colClassName = [
    styles.col,
    sizeXs && styles[`col-xs-${sizeXs}`],
    sizeSm && styles[`col-sm-${sizeSm}`],
    sizeMd && styles[`col-md-${sizeMd}`],
    sizeLg && styles[`col-lg-${sizeLg}`],
    sizeXl && styles[`col-xl-${sizeXl}`],
    offset && styles[`offset-${offset}`],
    offsetMd && styles[`offset-md-${offsetMd}`],
  ].join(" ");
  return (
    <div className={colClassName}>
      {children}
    </div>
  );
};

Col.propTypes = {
  children: PropTypes.node,
  sizeXs: PropTypes.number,
  sizeSm: PropTypes.number,
  sizeMd: PropTypes.number,
  sizeLg: PropTypes.number,
  sizeXl: PropTypes.number,
  offset: PropTypes.number,
  offsetMd: PropTypes.number,
};

export default Col;
