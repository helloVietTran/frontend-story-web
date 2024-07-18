import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faBars } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";

import BreadCumb from "../BreadCumb";
import InfoSideBar from "./InfoSideBar";
import UserSide from "./UserSide";
import styles from "./Information.module.scss";
import { DefaultLayout, Container, Grid, Row, Col } from "../Layout";

const cx = classNames.bind(styles);
function Information() {
  const { userData } = useSelector((state) => state.auth);
  const [isHided, setIsHided] = useState(false);

  const handleClick = () => {
    setIsHided(!isHided);
  };

  return (
    <DefaultLayout>
      <Container shouldApplyPadding isBackgroundVisible>
        <BreadCumb />
        <Grid>
          <div className="mt5">
            <Row>
              <Col sizeMd={3} sizeXs={12}>
                <div className={cx("user-sidebar")}>
                  <section>
                    <img
                      alt="user"
                      src={
                        userData?.avatar
                          ? userData.avatar
                          : "/images/anonymous/anonymous.png"
                      }
                    />
                    <div className={cx("user-text")}>
                      <span className={cx("title")}>Tài khoản của</span>
                      <span className={cx("user-name")}>{userData?.name}</span>
                    </div>
                    <FontAwesomeIcon
                      icon={isHided ? faBars : faAngleDown}
                      onClick={handleClick}
                    />
                  </section>
                </div>
                <InfoSideBar isHided={isHided}/>
              </Col>
              <Col sizeMd={9}  sizeXs={12}>
                <UserSide />
              </Col>
            </Row>
          </div>
        </Grid>
      </Container>
    </DefaultLayout>
  );
}

export default Information;
