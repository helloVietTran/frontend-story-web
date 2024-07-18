import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

import styles from "./FollowStory.module.scss";
import TopStory from "../TopStory";
import StoryCard from "../StoryCard";
import BreadCumb from "../BreadCumb";
import useTheme from "@/customHook/useTheme";
import { TinyNav } from "../NavTab";
import { PrimaryHeading } from "../Heading";
import { storyApi} from "@/config/api";
import { DefaultLayout, Container, Grid, Row, Col } from "../Layout";

const cx = classNames.bind(styles);

function FollowStory() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const themeClassName = useTheme(cx);

  const [followedStoryData, setFollowedStoryData] = useState([]);
  const [markedAsReadStory, setMarkedAsReadStory] = useState([]);
  const [activeElement, setActiveElement] = useState("option 1");
  // call api
  useEffect(() => {
    const fetchFollowedStories = async () => {
      try {
        if (activeElement === "option 1") {
          const res = await storyApi.getFollowedStories();
          setFollowedStoryData(res.data.follow);
          setMarkedAsReadStory(res.data.markAsRead);
        } else {
          const res = await storyApi.getUnReadStories();
          setMarkedAsReadStory(res.data.markAsRead);
          setFollowedStoryData(
            res.data.data.filter(
              (story) => !markedAsReadStory.includes(story._id)
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchFollowedStories();
  }, [activeElement, isLoggedIn]);

  return (
    <DefaultLayout>
      <Container shouldApplyPadding isBackgroundVisible>
        <BreadCumb />
        <Grid>
          <Row>
            <Col sizeLg={8} sizeXs={12}>
              <PrimaryHeading
                size={2}
                icon={faAngleRight}
                title="Truyện đang theo dõi"
              />
              <div className={cx("comics-followed")}>
                <div className="mt15">
                  <TinyNav
                    firstLabel="Mới cập nhật"
                    secondaryLabel="Chưa đọc"
                    onClick={setActiveElement}
                    activeElement={activeElement}
                  />
                </div>
                {!isLoggedIn ? (
                  <>
                    <div className={cx("not-log-in", themeClassName)}>
                      <p>
                        Vui lòng <Link to="/login">Đăng nhập</Link> để truy cập
                        truyện đã theo dõi ở bất cứ đâu. 
                        <br/> 
                        Để theo dõi truyện, nhấn
                        vào <u>Theo dõi</u> như hình bên dưới: <br />
                      </p>
                    </div>
                    <img
                      src="/images/back-ground/huong-dan-theo-doi-truyen.jpg"
                      width="660px"
                      alt="Hướng dẫn theo dõi"
                    />
                  </>
                ) : (
                  <Row>
                    {followedStoryData &&
                      followedStoryData.map((item) => {
                        return (
                          <Col sizeMd={3} sizeSm={4} sizeXs={6} key={item._id}>
                            <StoryCard
                              item={item}
                              followAction={true}
                              markedAsReadStory={markedAsReadStory}
                            />
                          </Col>
                        );
                      })}
                  </Row>
                )}
              </div>
            </Col>

            <Col sizeLg={4} sizeXs={12}>
              <TopStory />
            </Col>
          </Row>
        </Grid>
      </Container>
    </DefaultLayout>
  );
}

export default FollowStory;
