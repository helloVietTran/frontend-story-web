import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

import TopStory from "../TopStory/TopStory";
import BreadCumb from "@/components/BreadCumb/BreadCumb";
import HistoryCard from "./HistoryCard/HistoryCard";
import TinyNav from "../NavTab/TinyNav/TinyNav";
import PrimaryHeading from "../Heading/PrimaryHeading/PrimaryHeading";
import DefaultLayout from "../Layout/DefaultLayout/DefaultLayout";
import Container from "../Layout/Container/Container";
import Grid from "../Layout/Grid/Grid";
import Row from "../Layout/Row/Row";
import Col from "../Layout/Col/Col";


import styles from "./ReadHistory.module.scss";
import { readingStoryApi } from "../../config/api";

const cx = classNames.bind(styles);
function ReadHistory() {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const [readingHistoryData, setReadingHistoryData] = useState([]);
  const [activeItem, setActiveItem] = useState("option 1");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (activeItem === "option 1") {
          const data = JSON.parse(localStorage.getItem("visited_stories"));
          setReadingHistoryData(data);
        } else {
          const res = await readingStoryApi.getReadingHistory();
          setReadingHistoryData(res.data.visited_stories);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, [activeItem]);

  return (
    <DefaultLayout>
      <Container
        shouldApplyPadding
        isBackgroundVisible
      >
        <BreadCumb />
        <Grid>
          <Row>
            <Col sizeLg={8} sizeXs={12}>
              <PrimaryHeading
                title="Lịch sử đọc truyện"
                icon={faAngleRight}
                size={2}
              />
              <p className={cx("text")}>
                Lịch sử đọc truyện "Theo tài khoản" chỉ được lưu khi đọc hết
                chapter
              </p>
              <div className={cx("comics-followed")}>
                <div className="mt15">
                  <TinyNav
                    firstLabel="Từ thiết bị"
                    secondaryLabel="Theo tài khoản"
                    onClick={setActiveItem}
                    activeElement={activeItem}
                  />
                </div>
                <div className={cx("story-list")}>
                  {readingHistoryData ? (
                    <Row>
                      {activeItem === "option 1" ? (
                        readingHistoryData.map((item) => {
                          return (
                            <Col 
                            sizeMd={3} sizeSm={4} sizeXs={6}
                            key={item._id}
                            >
                              <HistoryCard
                                item={item}
                                activeItem={activeItem}
                                setReadingHistoryData={setReadingHistoryData}
                              />
                            </Col>
                          );
                        })
                      ) : isLoggedIn ? (
                        readingHistoryData.map((item) => {
                          return (
                            <Col
                             sizeMd={3}
                             sizeSm={4}
                             sizeXs={6}
                             key={item._id}
                             >
                              <HistoryCard
                                item={item}
                                activeItem={activeItem}
                                setReadingHistoryData={setReadingHistoryData}
                              />
                            </Col>
                          );
                        })
                      ) : (
                        <Col sizeXs={12}>
                          <p className="pb10">
                            Vui lòng
                            <Link to="/login"> Đăng nhập </Link>
                            để trải nghiệm tính năng này, truyện được hiển thị
                            như ảnh dưới:
                          </p>
                          <img
                            style={{ width: "100%" }}
                            src="images/back-ground/lich-su-doc-truyen.jpg"
                            alt="huong-dan"
                          />
                        </Col>
                      )}
                    </Row>
                  ) : (
                    <p>Bạn chưa đọc truyện nào</p>
                  )}
                </div>
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

export default ReadHistory;
