
import classNames from "classnames/bind";
import styles from "./SliderCard.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const cx = classNames.bind(styles);
function SliderCard({ data, key }) {
  return (
    <div className={cx("story-card")} key={key}>
      <Link to={`/story/${data.slug}/${data.id}`}>
        <img src={data.imgSrc} alt="slider" />
        <span className={cx("overlay")}></span>       
        <div className={cx("card-caption")}>
          <h3 className={cx("name")}>{data.name}</h3>
          <div className={cx("card-description")}>
            <span className={cx("chap")}>Chapter {data.newestChapter}</span>
            <span className={cx("update")}>
              <FontAwesomeIcon
                icon={faClockRotateLeft}
                className={cx("clock-icon")}
              />
              {data.updatedAt}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

SliderCard.propTypes = {
  data: PropTypes.object.isRequired,
  key: PropTypes.any.isRequired
}
export default SliderCard;
