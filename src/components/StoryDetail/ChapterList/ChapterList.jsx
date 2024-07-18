import React from 'react';
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { Row, Col } from "../../Layout";
import useTheme from '../../../customHook/useTheme';
import styles from "./ChapterList.module.scss";
import calculateTime from '../../../utils/calculateTime';

const cx = classNames.bind(styles);

const ChapterList = ({
    story, viewMore, action, setViewMore 
}) => {
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
            {
              Object.entries(story.chapters).reverse().map(([key, value]) => {
                return(
                  <li className={cx("chapter-item")} key={key}>
                  <Row>
                    <Col sizeXs={5}>
                      <Link
                        to={`${value.chap}`}
                        onClick={()=> action(story, + value.chap.slice(5))}
                      >
                        {"Chapter " + value.chap.slice(5)}
                      </Link>
                    </Col>
                    <Col sizeXs={4}>
                      <span className={cx("small")}>
                        {calculateTime(value.createdAt)}
                      </span>
                    </Col>

                    <Col sizeXs={3}>
                      <span className={cx("small")}>
                        {value.viewCount}
                      </span>
                    </Col>
                  </Row>
                </li>
                )
              })
            }

            {story.chapters.length > 20 && viewMore && (
              <Link
                className={cx("view-more")}
                onClick={() => setViewMore(false)}
              >
                <FontAwesomeIcon icon={faPlus} />
                Xem thêm
              </Link>
            )}
          </ul>
        </nav>
      </div>
    </Col>
  )
}

ChapterList.propTypes = {
    viewMore: PropTypes.bool.isRequired,
    setViewMore: PropTypes.func.isRequired,
    action: PropTypes.func.isRequired,
    story: PropTypes.object.isRequired,
}

export default ChapterList
