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
import Grid from "@/components/Layout/Grid/Grid";
import Row from "@/components/Layout/Row/Row";
import Col from "@/components/Layout/Col/Col";

const cx = classNames.bind(styles);

function SortMenu() {
  return (
    <div className={cx("sort-menu")}>
      <Grid>
        <Row>
          <Col sizeXs={6}>
            <ul>
              <li className={cx("menu-item", "mr-7")}>
                <Link to="/find-story?sort=10&status=-1">
                  <FontAwesomeIcon icon={faEye} />
                  Top all
                </Link>
              </li>
              <li className={cx("menu-item",  "mr-7")}>
                <Link to="/find-story?sort=10&status=-1">
                  <FontAwesomeIcon icon={faEye} />
                  Top tháng
                </Link>
              </li>
              <li className={cx("menu-item",  "mr-7")}>
                <Link to = "/find-story?sort=11&status=-1">
                  <FontAwesomeIcon icon={faEye} />
                  Top tuần
                </Link>
              </li>
              <li className={cx("menu-item",  "mr-7")}>
                <Link to="/find-story?sort=12&status=-1">
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
                <Link to ="/find-story?sort=20&status=-1">
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
                <Link to="/find-story/action?sort=21&status=-1">
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
