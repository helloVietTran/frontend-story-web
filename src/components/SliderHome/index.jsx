import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";

import styles from "./SliderHome.module.scss";
import SliderCard from "./SliderCard";
import { PrimaryHeading } from "../Heading";
import Sdata from "./Sdata";

const cx = classNames.bind(styles);

function NextArrow(props) {
  const { onClick } = props;
  return (
    <div className={cx("next-btn")} onClick={onClick}>
      <FontAwesomeIcon icon={faAngleRight} className={cx("right-icon")} />
    </div>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div className={cx("prev-btn")} onClick={onClick}>
      <FontAwesomeIcon icon={faAngleLeft} className={cx("left-icon")} />
    </div>
  );
}

function SliderHome() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    swipeToSlide: true,
    autoplay: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 2,
        }
      },
    ]
  };
  return (
    <>
      <PrimaryHeading 
        size={2}
        title="Truyện đề cử"
        icon={faAngleRight}
        bottom={10}
      />

      <div className={cx("slider")}>
        <Slider {...settings}>
          {Sdata.map((item, key) => {
            return <SliderCard item={item} key={key} />;
          })}
        </Slider>
      </div>
    </>
  );
}

export default SliderHome;
