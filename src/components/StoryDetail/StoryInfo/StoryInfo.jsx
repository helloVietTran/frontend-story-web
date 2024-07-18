import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import {
    faUser,
    faRss,
    faTags,
    faEye,
    faAngleRight,
    faPlus,
  } from "@fortawesome/free-solid-svg-icons";

import styles from "./StoryInfo.module.scss";
import useTheme from "@/customHook/useTheme";
import StoryDetailItem from "../StoryDetailItem";
import { PrimaryButton } from "@/components/Button";
import { Row, Col } from "@/components/Layout";

const cx = classNames.bind(styles);

const StoryInfo = ({
  story,
  following,
  firstAction,
  secondaryAction,
  isAuthenticated,
  
}) => {
  const themeClassName = useTheme(cx);
  const genreContent = <div>
    {story.genres.map((item, index) => {
      return (
        <span key={item}>
          <Link>{item}</Link>
          {index !== story.genres.length - 1 && <span> - </span>}
        </span>
      );
  })}
  </div>;
  return (
    <div className={cx("story-info", themeClassName)}>
      <Row>
        <Col sizeSm={4} sizeXs={12}>
          <img src={story.imgSrc} alt="story" className={cx("story-img")} />
        </Col>

        <Col sizeSm={8} sizeXs={12}>
          <StoryDetailItem
            label="Tác giả"
            content={story.author === "" ? "Đang cập nhật" : story.author}
            icon={faUser}
          />

        {
          story.otherName &&   
          <StoryDetailItem
          label="Tên khác"
          icon={faPlus}
          content={story.otherName}
          />
        }

          <StoryDetailItem
            label="Tình trạng"
            content={story.status}
            icon={faRss}
          />

          <StoryDetailItem
            label="Thể loại"
            icon={faTags}
            content={genreContent}
            key={"abc"}
          />

          <StoryDetailItem
            label="Lượt xem"
            icon={faEye}
            content={story.viewCount.toLocaleString()}
          />

          <div className={`mt5 mb10 ${cx("follower")}`}>
            <Link>
              {story.name + " "}
            </Link>
            <span>
              Xếp hạng:
              <span>{" " + story.rate}</span>/<span>5</span>-
              <span>{" " + story.ratingCount + " "}</span>
              Lượt đánh giá
            </span>
          </div>
          <div className={`${cx("rating")} mt5 mb10`}>
            <Row>
              <Col sizeXs={6}>
                <img src="/images/rating/star-off.png" alt="star" />
                <img src="/images/rating/star-off.png" alt="star" />
                <img src="/images/rating/star-off.png" alt="star" />
                <img src="/images/rating/star-off.png" alt="star" />
                <img src="/images/rating/star-off.png" alt="star" />
              </Col>
            </Row>
          </div>

          <div className={cx("follow-action")}>
            {!following ? (
              <PrimaryButton
                color="green"
                onClick={firstAction}
                title="Theo dõi"
              />
            ) : (
              <PrimaryButton
                color="red"
                title="Bỏ theo dõi"
                onClick={secondaryAction}
              />
            )}

            <strong className="ml4">
              {story.follower.toLocaleString() + " "}
            </strong>
            <span>Lượt theo dõi</span>
          </div>
          <div className={`${cx("read-action")} mt10 mb5`}>
            <Link to={`/story/${story.slug}/${story._id}/chap-1`}>
              <PrimaryButton color="green" title="Đọc từ đầu" />
            </Link>
            <Link
              to={`/story/${story.slug}/${story._id}/chap-${story.lastChapter}`}
            >
              <PrimaryButton color="yellow" title="Đọc mới nhất" />
            </Link>
            {isAuthenticated && (
              <Link>
                <PrimaryButton
                  color="red"
                  title="Đọc tiếp"
                  icon={faAngleRight}
                  iconPosition="right"
                />
              </Link>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};
StoryInfo.propTypes = {
  firstAction: PropTypes.func.isRequired,
  secondaryAction: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  story: PropTypes.object.isRequired,
  following: PropTypes.bool.isRequired,
};
export default StoryInfo;
