import { Link } from "react-router-dom";
import classNames from "classnames/bind";

import styles from "./GenreMenu.module.scss";
import { options } from "../../../config/filter";
import { Grid, Row, Col } from "../../Layout";

const cx = classNames.bind(styles);

function GenreMenu() {
  return (
    <div className={cx("genre-menu")}>
      <Grid>
        <Row>
          <Col sizeMd={3} sizeXs={6}>
            <ul>
              {options.slice(0, options.length / 4).map((option) => {
                return (
                  <li
                    className={option.active ? cx("active") : undefined}
                    key={option.name}
                  >
                    <Link to={option.path} className={cx("menu-item")}>
                      {option.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Col>

          <Col sizeMd={3} sizeXs={6}>
            <ul>
              {options
                .slice(options.length / 4, (2 * options.length) / 4)
                .map((option) => {
                  return (
                    <li
                      className={option.active ? cx("active") : undefined}
                      key={option.name}
                    >
                      <Link to={option.path} className={cx("menu-item")}>
                        {option.name}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </Col>

          <Col sizeMd={3} sizeXs={6}>
            <ul>
              {options
                .slice((2 * options.length) / 4, (3 * options.length) / 4)
                .map((option) => {
                  return (
                    <li
                      className={option.active ? cx("active") : undefined}
                      key={option.name}
                    >
                      <Link to={option.path} className={cx("menu-item")}>
                        {option.name}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </Col>

          <Col sizeMd={3} sizeXs={6}>
            <ul>
              {options
                .slice((3 * options.length) / 4, options.length)
                .map((option) => {
                  return (
                    <li
                      className={option.active ? cx("active") : undefined}
                      key={option.name}
                    >
                      <Link to={option.path} className={cx("menu-item")}>
                        {option.name}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

export default GenreMenu;
