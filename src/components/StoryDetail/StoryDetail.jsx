import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faAngleRight,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { faFileText } from "@fortawesome/free-regular-svg-icons";
import io from "socket.io-client";

import styles from "./StoryDetail.module.scss";
import TopStory from "../TopStory";
import BreadCumb from "../BreadCumb";
import useTheme from "../../customHook/useTheme";
import CommentBox from "../CommentBox";
import addLocalHistory from "../../utils/addLocalHistory";
import StoryInfo from "./StoryInfo";
import ChapterList from "./ChapterList";
import { login } from "@/actions/auth";
import  formatDate  from "../../utils/formatDate";
import { Grid, Row, Col } from "../Layout";
import { storyApi, userApi } from "../../config/api";

const cx = classNames.bind(styles);
function StoryDetail() {
  const dispatch = useDispatch();
  const themeClassName = useTheme(cx);

  const { isAuthenticated, userData } = useSelector((state) => state.auth);

  const [seeMore, setSeeMore] = useState(true); // see more description
  const [viewMore, setViewMore] = useState(true); // view more chapter
  const [story, setStory] = useState(null);
  const [following, setFollowing] = useState(false);

  const { storyID } = useParams();

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  // call api
  useEffect(() => {
    const fetchStory = async () => {
      try {
        const res = await storyApi.getStory(storyID);
        setStory(res.data);
      } catch (error) {
        console.log("fetching story fail", error);
      }
    };

    fetchStory();
  }, [storyID]);

  // get follow status

  useEffect(() => {
    const fetchFollowStatus = async () => {
      try {
        const res = await userApi.getFollowStatus();
        setFollowing(res.data.includes(storyID));
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchFollowStatus();
  }, [userData, storyID]);

  //real-time
  useEffect(() => {
    const socket = io(backendUrl);
    socket.on("follow story", ({ storyId, follower }) => {
      setFollowing(!following);
      if (!userData.follow.includes(storyID)) {
        let newUserData = {
          ...userData,
          follow: [...userData.follow, storyId],
        };

      //  dispatch(loginAction(newUserData));
      }
      setStory((prevStory) => {
        return {
          ...prevStory,
          follower: follower,
        };
      });
    });
    socket.on("unfollow story", ({ storyId, follower }) => {
      setFollowing(!following);

      if (userData?.follow.includes(storyId)) {
        userData.follow = userData.follow.filter((ele) => ele !== storyID);
       // dispatch(loginAction(userData));
      }
      setStory((prevStory) => {
        return {
          ...prevStory,
          follower: follower,
        };
      });
    });

    return () => {
      socket.disconnect();
    };
  });

  if (story == null) {
    // xử lý khi api chưa kịp lấy về
    return <div>Loading...</div>;
  }

  const handleFollowStory = async (id) => {
    if (!isAuthenticated) {
      alert("Vui lòng đăng nhập để theo dõi truyện");
      return;
    }
  
    try {
      await userApi.followStory(id);
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleUnFollowStory = async (id) => {
    if (!isAuthenticated) {
      alert("Vui lòng đăng nhập để theo dõi truyện");
      return;
    }
  
    try {
      await userApi.unFollowStory(id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddLocalHistory = (story, chap) => {
    const visited_story = {
      _id: story._id,
      name: story.name,
      slug: story.slug,
      url: story.url,
      chap: chap,
    };
    addLocalHistory(visited_story);
  };

  return (
    <div className={cx("story-detail", themeClassName)}>
      <Grid>
        <Row>
          <Col sizeLg={8} sizeMd={12}>
            <BreadCumb comicName={story.name} />

            <h1 className={cx("title")}>{story.name}</h1>
            <time className={cx("time-text")}>
              [ Cập nhật lúc: {formatDate(story.updatedAt, true)}]
            </time>

            <StoryInfo
              story={story}
              firstAction={() => handleUnFollowStory(story._id)}
              secondaryAction={() => handleFollowStory(story._id)}
              following={following}
              isAuthenticated={isAuthenticated}
            />

            <Row>
              <div className={cx("description")}>
                <h3>
                  <FontAwesomeIcon icon={faFileText} className="mr4" />
                  Nội dung
                </h3>

                <p>
                  {story.description}
                  <span
                    className={seeMore ? cx("mask-gradient") : undefined}
                  ></span>
                </p>
                <Link onClick={() => setSeeMore(!seeMore)}>
                  {seeMore === false && (
                    <FontAwesomeIcon icon={faAngleLeft} className="mr4" />
                  )}
                  {seeMore ? "Xem thêm" : "Thu gọn"}
                  {seeMore === true && (
                    <FontAwesomeIcon icon={faAngleRight} className="ml4" />
                  )}
                </Link>
              </div>

              <div className={cx("chapter-list")}>
                <h2>
                  <FontAwesomeIcon icon={faList} className="mr4" />
                  Danh sách chương
                </h2>
              </div>

              <ChapterList
                story={story}
                action={handleAddLocalHistory}
                setViewMore={setViewMore}
                viewMore={viewMore}
              />
            </Row>

            <CommentBox />

          </Col>

          <Col sizeLg={4} sizeXs={12}>
            <TopStory />
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

export default StoryDetail;
