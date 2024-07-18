import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faEye,
  faRefresh,
  faThumbsUp,
  faCloudDownload,
  faSignal,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";

import styles from "./SortMenu.module.scss";
import { Grid, Row, Col } from "../../Layout";

const cx = classNames.bind(styles);

function SortMenu() {
  return (
    <div className={cx("sort-menu")}>
      <Grid>
        <Row>
          <Col sizeXs={6}>
            <ul>
              <li className={cx("menu-item", "mr-7")}>
                <Link>
                  <FontAwesomeIcon icon={faEye} />
                  Top all
                </Link>
              </li>
              <li className={cx("menu-item",  "mr-7")}>
                <Link>
                  <FontAwesomeIcon icon={faEye} />
                  Top tháng
                </Link>
              </li>
              <li className={cx("menu-item",  "mr-7")}>
                <Link>
                  <FontAwesomeIcon icon={faEye} />
                  Top tuần
                </Link>
              </li>
              <li className={cx("menu-item",  "mr-7")}>
                <Link>
                  <FontAwesomeIcon icon={faEye} />
                  Top ngày
                </Link>
              </li>
              <li className={cx("menu-item",  "mr-7")}>
                <Link to="/find-story?sort=22&status=-1">
                  <FontAwesomeIcon icon={faList} />
                  Số chapter
                </Link>
              </li>
            </ul>
          </Col>

          <Col sizeXs={6}>
            <ul>
              <li className={cx("menu-item", "ml7")}>
                <Link to="/find-story?status=1">
                  <strong>
                    <FontAwesomeIcon icon={faSignal} />
                    Truyện full
                  </strong>
                </Link>
              </li>
              <li className={cx("menu-item", "ml7")}>
                <Link>
                  <FontAwesomeIcon icon={faThumbsUp} />
                  Yêu thích
                </Link>
              </li>
              <li className={cx("menu-item", "ml7")}>
                <Link to="/find-story?sort=1&status=-1">
                  <FontAwesomeIcon icon={faRefresh} />
                  Mới cập nhật
                </Link>
              </li>
              <li className={cx("menu-item", "ml7")}>
                <Link to="/find-story?sort=2&status=-1">
                  <FontAwesomeIcon icon={faCloudDownload} />
                  Truyện mới
                </Link>
              </li>
              <li className={cx("menu-item", "ml7")}>
                <Link>
                  <FontAwesomeIcon icon={faComment} />
                  Bình luận
                </Link>
              </li>
            </ul>
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

export default SortMenu;
