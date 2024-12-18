import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";

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
import getReadingHistoriesFromLocal from "@/utils/getReadingHistoryFromLocal";
import deleteReadingHistoryFromLocal from "@/utils/deleteReadingHistoryFromLocal";
import {
  deleteReadingHistory,
  getMyReadingHistory,
} from "@/api/readingHistoryApi";

const cx = classNames.bind(styles);
function ReadHistory() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [activeLabel, setActiveLabel] = useState("option 1");

  // lịch sử đọc truyện theo thiết bị
  const [localReadingHistories, setLocalReadingHistories] = useState([]);

  useEffect(() => {
    setLocalReadingHistories(getReadingHistoriesFromLocal());
  }, []);

  const handleDeleteReadingHistory = (id) => {
    setLocalReadingHistories(deleteReadingHistoryFromLocal(id));
  };

  const { data, refetch } = useQuery({
    enabled: isAuthenticated,
    queryKey: ["myReadingHistories"],
    queryFn: getMyReadingHistory,
  });

  const style = {
    fontSize: "14px",
  };
  const deleteReadingHistoryInServerMutation = useMutation({
    mutationFn: deleteReadingHistory,
    onSuccess: () => {
      toast.success("Xóa lịch sử thành công", {
        style,
      });
      refetch();
    },
    onError: () => {
      toast.error("Vui lòng thử lại sau!", {
        style,
      });
    },
  });

  const handleDeleteReadingHistoryInServer = async (id) => {
    // id của bản ghi reading history
    deleteReadingHistoryInServerMutation.mutate(id);
  };

  return (
    <DefaultLayout>
      <Container shouldApplyPadding isBackgroundVisible>
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
                    onClick={setActiveLabel}
                    activeElement={activeLabel}
                  />
                </div>
                <div className={cx("story-list")}>
                  {activeLabel === "option 1" &&
                    localReadingHistories.length > 0 && (
                      <Row>
                        {localReadingHistories.map((item) => {
                          return (
                            <Col sizeMd={3} sizeSm={4} sizeXs={6} key={item.id}>
                              <HistoryCard
                                data={item}
                                handleDeleteReadingHistory={
                                  handleDeleteReadingHistory
                                }
                              />
                            </Col>
                          );
                        })}
                      </Row>
                    )}
                  {activeLabel === "option 2" && (
                    <>
                      {isAuthenticated ? (
                        data &&data.length > 0 ? (
                          <Row>
                            {data.map((item) => {
                              return (
                                <Col
                                  sizeMd={3}
                                  sizeSm={4}
                                  sizeXs={6}
                                  key={item.id}
                                >
                                  <HistoryCard
                                    data={item}
                                    handleDeleteReadingHistory={
                                      handleDeleteReadingHistoryInServer
                                    }
                                  />
                                </Col>
                              );
                            })}
                          </Row>
                        ) : (
                          <p>Bạn chưa đọc truyện nào</p>
                        )
                      ) : (
                        // Nếu người dùng chưa đăng nhập
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
                    </>
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
