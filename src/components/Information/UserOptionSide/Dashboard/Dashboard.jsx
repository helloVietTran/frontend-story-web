import React from "react";
import classname from "classnames/bind";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";

import SecondaryHeading from "@/components/Heading/SecondaryHeading/SecondaryHeading";
import Grid from "@/components/Layout/Grid/Grid";
import Row from "@/components/Layout/Row/Row";
import Col from "@/components/Layout/Col/Col";
import PostHeading from "@/components/Heading/PostHeading/PostHeading";
import ContentBox from "@/components/Box/ContentBox/ContentBox";

import useTheme from "@/customHook/useTheme";
import styles from "./Dashboard.module.scss";
import { getMyInfo } from "@/api/userApi";
import { getPoint } from "@/api/pointApi";

const cx = classname.bind(styles);

function Dashboard() {
  const themeClassName = useTheme(cx);

  const { data: user } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getMyInfo,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: () => 3000,
  });

  const { data: point } = useQuery({
    queryKey: ["point"],
    queryFn: getPoint,
  });
  
  return (
    <div className={cx("dashboard", themeClassName)}>
      <SecondaryHeading size={2.2} title="Thông tin chung" bottom={20} />
      <Grid>
        <Row>
          <Col sizeMd={6} sizeXs={12}>
            <div className={cx("account-info")}>
              <div className="d-flex mb20">
                <PostHeading title="Thông tin tài khoản" />
                <Link to="/secure/userProfile" className={cx("seeMore")}>
                  Chỉnh sửa <FontAwesomeIcon icon={faAngleRight} />
                </Link>
              </div>

              {user && (
                <ContentBox
                  bodyContent={
                    <>
                      <div className="group">
                        <span className="label">Họ và tên</span>
                        <span className="detail">{user.name}</span>
                      </div>
                      <div className="group">
                        <span className="label">-</span>
                        <Link className="detail">Thông tin công khai</Link>
                      </div>
                      <div className="group">
                        <span className="label">Email</span>
                        <span className="detail">{user.email}</span>
                      </div>
                    </>
                  }
                />
              )}
            </div>
          </Col>
          <Col sizeMd={6} sizeXs={12}>
            <div className={cx("account-info")}>
              <div className="mb20">
                <PostHeading title="Trình độ tu luyện" />
              </div>

              {user && (
                <ContentBox
                  bodyContent={
                    <>
                      <div className={cx("skill-box")}>
                        <div className={`${cx("level")} group`}>
                          <span>
                            Cấp{" "}
                            <span className={cx("current-lv")}>
                              {user.level.level}
                            </span>
                          </span>
                          <span>
                            Cấp{" "}
                            <span className={cx("next-lv")}>
                              {user.level.level + 1}
                            </span>
                          </span>
                        </div>
                        <div className={cx("process")}>
                          <span
                            style={{ width: user.level.process * 100 + "%" }}
                            className={cx("process-bar", "animate")}
                          >
                            {user.level.process * 100}%
                          </span>
                        </div>
                      </div>

                      <div className="group">
                        <span className="label">Trình độ </span>
                        <span className="detail red">{user.level.rankName}</span>
                      </div>
                      <hr />
                      <div className="group">
                        <span className="label">Số linh thạch</span>
                        <Link className="detail">{point ? point.total : 0}</Link>
                      </div>
                    </>
                  }
                />
              )}
            </div>
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

export default Dashboard;
