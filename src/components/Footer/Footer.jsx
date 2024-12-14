import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";

import Container from "../Layout/Container/Container";
import Grid from "../Layout/Grid/Grid";
import Row from "../Layout/Row/Row";
import Col from "../Layout/Col/Col";

import useTheme from "../../customHook/useTheme";
import hashtag from "./hastag";
import styles from "./Footer.module.scss";

const cx = classNames.bind(styles);
function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const themeClassName = useTheme(cx);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={cx("footer-bg")}>
      {isVisible && (
        <span className={cx("back-to-top")} onClick={scrollToTop}>
          <FontAwesomeIcon icon={faAngleUp} className={cx("up-icon")} />
        </span>
      )}
      <Container>
        <Grid>
          <Row>
            <Col sizeLg={4}>
              <div className="mt10">
                <iframe
                  tittle="fanpage"
                  src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D61556648275676&tabs=timeline%2C%20messages&width=340&height=230&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                  width="324"
                  height="230"
                  style={{ border: "none", overflow: "hidden" }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                ></iframe>

                <span className={`${cx("copy-right")} mt10`}>
                  Copyright
                  <FontAwesomeIcon icon={faCopyright} />
                  2024 Viet Anh
                </span>
              </div>
            </Col>
            
            <Col sizeLg={8}>
              <div className={`${cx("hashtag")} mt10 `}>
                <h4>Từ khóa</h4>
                <ul>
                  {hashtag.map((item, key) => {
                    return (
                      <li key={key}>
                        <Link to="/"> {item}</Link>
                      </li>
                    );
                  })}
                </ul>
                <hr className="mt10 mb10" />
                <div className={`${cx("policy")} mt10 ${themeClassName}`}>
                  <Link to="/">Liên hệ bản quyền</Link>
                  <Link to="/">Chính sách bảo mật</Link>
                  <Link to="/">Liên hệ nội dung</Link>
                </div>
              </div>
            </Col>
          </Row>
        </Grid>
      </Container>
    </div>
  );
}

export default Footer;
