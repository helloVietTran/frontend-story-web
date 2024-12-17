import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import Row from "@/components/Layout/Row/Row";
import Col from "@/components/Layout/Col/Col";

import useTheme from "@/customHook/useTheme";
import styles from "./ChapterList.module.scss";

const cx = classNames.bind(styles);

const ChapterList = ({ data, viewMore, setViewMore }) => {
  const themeClassName = useTheme(cx);
  return (
    <Col sizeXs={12}>
      <div className={cx("chapter-list", themeClassName)}>
        <div className={cx("heading")}>
          <Row>
            <Col sizeXs={5}>Số chương</Col>
            <Col sizeXs={4}>
              <span className="text-center">Cập nhật</span>
            </Col>
            <Col sizeXs={3}>
              <span className="text-center">Xem</span>
            </Col>
          </Row>
        </div>

        <nav>
          <ul>
            {data &&
              data.map((item) => {
                return (
                  <li className={cx("chapter-item")} key={item.id}>
                    <Row>
                      <Col sizeXs={5}>
                        <Link
                          to={`chap-${item.chap}`}
                        >
                          {"Chapter " + item.chap}
                        </Link>
                      </Col>
                      <Col sizeXs={4}>
                        <span className={cx("small")}>
                          {item.updatedAt}
                        </span>
                      </Col>

                      <Col sizeXs={3}>
                        <span className={cx("small")}>{item.viewCount}</span>
                      </Col>
                    </Row>
                  </li>
                );
              })}

            {/*story.chapters.length > 20 && viewMore && (
              <Link
                className={cx("view-more")}
                onClick={() => setViewMore(false)}
              >
                <FontAwesomeIcon icon={faPlus} />
                Xem thêm
              </Link>
            )*/}
          </ul>
        </nav>
      </div>
    </Col>
  );
};

ChapterList.propTypes = {
  viewMore: PropTypes.bool.isRequired,
  setViewMore: PropTypes.func.isRequired,
  action: PropTypes.func.isRequired,
  data: PropTypes.any,
};

export default ChapterList;
