import React from "react";
import classname from "classnames/bind";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

import { SecondaryHeading } from "@/components/Heading";
import { Grid, Row, Col } from "@/components/Layout";
import { PostHeading } from "@/components/Heading";
import { ContentBox } from "@/components/Box";
import useTheme from "@/customHook/useTheme";
import styles from "./Dashboard.module.scss";

const cx = classname.bind(styles);

function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const themeClassName = useTheme(cx);

  const userInfo = (
    <>
      <div className="group">
        <span className="label">Họ và tên</span>
        <span className="detail">{user?.name}</span>
      </div>
      <div className="group">
        <span className="label">-</span>
        <Link className="detail">Thông tin công khai</Link>
      </div>
      <div className="group">
        <span className="label">Email</span>
        <span className="detail">{user?.email}</span>
      </div>
    </>
  );

  const userProcess = (
    <>
      <div className={cx("skill-box")}>
        <div className={`${cx("level")} group`}>
          <span>
            Cấp <span className={cx("current-lv")}>{user?.level}</span>
          </span>
          <span>
            Cấp <span className={cx("next-lv")}>{user?.level + 1}</span>
          </span>
        </div>
        <div className={cx("process")}>
          <span
            style={{ width: user?.process }}
            className={cx("process-bar", "animate")}
          >
            {user?.process + "%"}
          </span>
        </div>
      </div>

      <div className="group">
        <span className="label">Trường phái </span>
        <span className="detail red">{user?.class || "Thường dân"}</span>
      </div>
      <hr />
      <div className="group">
        <span className="label">Số linh thạch</span>
        <Link className="detail">{user?.point}</Link>
      </div>
    </>
  );

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

              <ContentBox bodyContent={userInfo} />
            </div>
          </Col>
          <Col sizeMd={6} sizeXs={12}>
            <div className={cx("account-info")}>
              <div className="mb20">
                <PostHeading title="Trình độ tu luyện" />
              </div>
              <ContentBox bodyContent={userProcess} />
            </div>
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

export default Dashboard;
