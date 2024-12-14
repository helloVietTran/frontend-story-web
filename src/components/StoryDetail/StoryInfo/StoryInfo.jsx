import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { Link, useParams } from "react-router-dom";
import {
  faUser,
  faRss,
  faTags,
  faEye,
  faAngleRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

import StoryDetailItem from "../StoryDetailItem/StoryDetailItem";
import PrimaryButton from "@/components/Button/PrimaryButton/PrimaryButton";
import Row from "@/components/Layout/Row/Row";
import Col from "@/components/Layout/Col/Col";

import styles from "./StoryInfo.module.scss";
import useTheme from "@/customHook/useTheme";
import { getFollowedStoryByStoryId, ratingStory } from "@/api/storyApi";
import createQueryFn from "@/utils/createQueryFn";
import { followStory, unfollowStory } from "@/api/userApi";
import connectWebSocket from "@/utils/connectWebsocket";

const cx = classNames.bind(styles);

const StoryInfo = ({ story, isAuthenticated }) => {
  const themeClassName = useTheme(cx);

  const queryClient = useQueryClient();

  const [isFollowed, setIsFollowed] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const { storyID } = useParams();

  const [followerCount, setFollowerCount] = useState(0);

  // websocket
  useEffect(() => {
    const channels = [
      `/topic/followers/${storyID}`, //kênh nhận follow
    ];

    const client = connectWebSocket(channels, (channel, data) => {
      if (channel === `/topic/followers/${storyID}`) {
        setFollowerCount(data);
      }
    });

    return () => client.deactivate();
  }, [storyID]);

  //***********define query *************
  const { data: myFollowedStory, isSuccess } = useQuery({
    enabled: !!storyID,
    queryKey: ["myFollowedStory", storyID],
    queryFn: createQueryFn(getFollowedStoryByStoryId),
  });

  // check
  useEffect(() => {
    if (isSuccess) setIsFollowed(true);
    else setIsFollowed(false);
  }, [isSuccess]);

  //*************define mutate ************
  const toastStyles = {
    fontSize: "14px",
  };

  const followMutation = useMutation({
    mutationFn: followStory,
    onSuccess: () => {
      queryClient.invalidateQueries(["myFollowedStory", storyID]);
      setIsFollowed(true);
      setFollowerCount(0); // reset
    },
    onError: (error) => {
      toast.error("Có lỗi xảy ra. Vui lòng quay lại sau!", {
        style: toastStyles,
        duration: 3000,
        position: "top-center",
      });
    },
  });

  const unfollowMutation = useMutation({
    mutationFn: unfollowStory,
    onSuccess: () => {
      queryClient.invalidateQueries(["myFollowedStory", storyID]);
      setIsFollowed(false);
    },
    onError: () => {
      toast.error("Có lỗi xảy ra. Vui lòng quay lại sau!", {
        style: toastStyles,
        duration: 3000,
        position: "top-center",
      });
    },
  });

  const ratingMutation = useMutation({
    mutationFn: ratingStory,
    onSuccess: (data) => {
      toast.success("Rating thành công!", {
        style: toastStyles,
        duration: 3000,
        position: "top-center",
      });
    },
    onError: (error) => {
      toast.error("Có lỗi xảy ra. Vui lòng quay lại sau!", {
        style: toastStyles,
        duration: 3000,
        position: "top-center",
      });
    },
  });

  /************ Code cho chức năng rating**********/
  const totalStars = 5; // tổng số sao

  const handleMouseEnter = (index) => {
    // rê chuột vào ngôi sao
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (index) => {
    setRating(index);
    ratingMutation.mutate(storyID, index); // index là số điểm đánh giá
  };

  /***** *******Code cho chức năng follow**********/

  const handleFollowStory = async (id) => {
    if (!isAuthenticated) {
      toast.error("Vui lòng đăng nhập để theo dõi truyện", {
        style: toastStyles,
      });
      return;
    }

    followMutation.mutate(storyID);
  };

  const handleUnFollowStory = async () => {
    if (!myFollowedStory) return;

    unfollowMutation.mutate({
      followId: myFollowedStory.id,
      storyId: storyID,
    });
  };

  const genreContent = "";
   /* (
    <div>
      {story.genres.map((item, index) => {
        return (
          <span key={item}>
            <Link>{item}</Link>
            {index !== story.genres.length - 1 && <span> - </span>}
          </span>
        );
      })}
    </div>
  ); */

  return (
    <div className={cx("story-info", themeClassName)}>
      <Row>
        <Col sizeSm={4} sizeXs={12}>
          <img src={story.imgSrc} alt="story" className={cx("story-img")} />
        </Col>

        <Col sizeSm={8} sizeXs={12}>
          <StoryDetailItem
            label="Tác giả"
            content={!story.authorName ? "Đang cập nhật" : story.authorName}
            icon={faUser}
          />

          {story.otherName && (
            <StoryDetailItem
              label="Tên khác"
              icon={faPlus}
              content={story.otherName}
            />
          )}

          <StoryDetailItem
            label="Tình trạng"
            content={story.status}
            icon={faRss}
          />

          <StoryDetailItem
            label="Thể loại"
            icon={faTags}
            content={genreContent}
            key={"xyz"}
          />

          <StoryDetailItem
            label="Lượt xem"
            icon={faEye}
            content={story.viewCount.toLocaleString()}
          />

          <div className={`mt5 mb10 ${cx("follower")}`}>
            <Link>{story.name + " "}</Link>
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
                {Array.from({ length: totalStars }, (_, index) => {
                  const starIndex = index + 1;
                  return (
                    <img
                      className={cx("star-icon")}
                      key={starIndex}
                      src={
                        starIndex <= (hoverRating || rating)
                          ? "/images/rating/star-on.png"
                          : "/images/rating/star-off.png"
                      }
                      alt="star"
                      style={{
                        cursor: "pointer",
                        width: "30px",
                        height: "30px",
                      }}
                      onMouseEnter={() => handleMouseEnter(starIndex)}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => handleClick(starIndex)}
                    />
                  );
                })}
              </Col>
            </Row>
          </div>

          <div className={cx("follow-action")}>
            {isFollowed ? (
              <PrimaryButton
                color="red"
                title="Bỏ theo dõi"
                onClick={handleUnFollowStory}
              />
            ) : (
              <PrimaryButton
                color="green"
                onClick={handleFollowStory}
                title="Theo dõi"
              />
            )}

            <strong className="ml4">
              {followerCount === 0
                ? story.follower.toLocaleString() + " "
                : followerCount}
            </strong>
            <span>Lượt theo dõi</span>
          </div>
          <div className={`${cx("read-action")} mt10 mb5`}>
            <Link to={`/story/${story.slug}/${story.id}/chap-1`}>
              <PrimaryButton color="green" title="Đọc từ đầu" />
            </Link>
            <Link
              to={`/story/${story.slug}/${story.id}/chap-${story.newestChapter}`}
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
  isAuthenticated: PropTypes.bool.isRequired,
  story: PropTypes.object.isRequired,
};
export default StoryInfo;
