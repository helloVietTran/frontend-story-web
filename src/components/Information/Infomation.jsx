import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faBars } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import { useQuery } from "@tanstack/react-query";


import BreadCumb from "@/components/BreadCumb/BreadCumb";
import InfoSideBar from "./InfoSideBar/InfoSideBar";
import UserSide from "./UserOptionSide/UserOptionSide";
import DefaultLayout from "../Layout/DefaultLayout/DefaultLayout";
import Container from "../Layout/Container/Container";
import Grid from "../Layout/Grid/Grid";
import Col from "../Layout/Col/Col";
import Row from "../Layout/Row/Row";

import styles from "./Information.module.scss";
import { getMyInfo } from "@/api/userApi";

const cx = classNames.bind(styles);
function Information() {
  const [isHided, setIsHided] = useState(false);

  const handleClick = () => {
    setIsHided(!isHided);
  };

  const { data: user } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getMyInfo,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: () => 3000,
  });


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
                        user?.imgSrc
                          ? user.imgSrc
                          : "/images/anonymous/anonymous.png"
                      }
                    />
                    <div className={cx("user-text")}>
                      <span className={cx("title")}>Tài khoản của</span>
                      <span className={cx("user-name")}>{user?.name}</span>
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
