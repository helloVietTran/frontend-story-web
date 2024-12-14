import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";

import styles from "./FollowStory.module.scss";
import TopStory from "../TopStory/TopStory";
import StoryCard from "../StoryCard/StoryCard";
import BreadCumb from "@/components/BreadCumb/BreadCumb";
import TinyNav from "../NavTab/TinyNav/TinyNav";
import PrimaryHeading from "../Heading/PrimaryHeading/PrimaryHeading";
import DefaultLayout from "../Layout/DefaultLayout/DefaultLayout";
import Container from "../Layout/Container/Container";
import Grid from "../Layout/Grid/Grid";
import Row from "../Layout/Row/Row";
import Col from "../Layout/Col/Col";

import useTheme from "@/customHook/useTheme";
import { getMyFollowedStories } from "@/api/storyApi";

const cx = classNames.bind(styles);

function FollowStory() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const themeClassName = useTheme(cx);

  const [activeElement, setActiveElement] = useState("option 1");

  // call api
  const { data: followedData } = useQuery({
    queryKey: ["followedStories"],
    queryFn: getMyFollowedStories,
    staleTime: 5 * 60 * 1000,
  });

  console.log(followedData);
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
                {!isAuthenticated ? (
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
                    {followedData &&
                      followedData.map((item) => {
                        return (
                          <Col sizeMd={3} sizeSm={4} sizeXs={6} key={item.id}>
                            <StoryCard
                              data={item.story}
                            
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
