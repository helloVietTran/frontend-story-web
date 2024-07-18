import classNames from "classnames/bind";
import styles from "./SliderCard.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);
function SliderCard({ item, key }) {
  return (
    <div className={cx("story-card")} key={key}>
      <Link to="/">
        <img src={item.src} alt="slider" />
        <span className={cx("overlay")}></span>       
        <div className={cx("card-caption")}>
          <h3 className={cx("name")}>{item.name}</h3>
          <div className={cx("card-description")}>
            <span className={cx("chap")}>Chapter {item.lastChap}</span>
            <span className={cx("update")}>
              <FontAwesomeIcon
                icon={faClockRotateLeft}
                className={cx("clock-icon")}
              />
              {item.lastUpdated}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default SliderCard;
