import { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faHouseChimney,
  faList,
  faChevronRight,
  faChevronLeft,
  faHeart,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./ChapterDetail.module.scss";
import { PrimaryButton } from "../Button";
import BreadCumb from "../BreadCumb";
import CommentBox from "../CommentBox/CommentBox";
import { viewCountApi, storyApi, readingStoryApi } from "@/config/api";
import ChapterSelect from "./ChapterSelect";
import addLocalHistory from "@/utils/addLocalHistory";
import useTheme from "@/customHook/useTheme";
import { Container } from "../Layout";
import { ReportModal } from "../Modal"; 
import ImageList from "./ImageList";

const cx = classNames.bind(styles);

function ChapterDetail() {
  const navRef = useRef();
  const nextBtnRef = useRef();
  const prevBtnRef = useRef();

  const themeClassName = useTheme(cx);

  const navigate = useNavigate();
  const { storyName, storyID, chap } = useParams();

  const [currentChapter, setCurrentChapter] = useState(parseInt(chap.slice(5))); // lấy chapter hiện tại
  const [story, setStory] = useState(null);
  const [isFixed, setIsFixed] = useState(false);
  const [isOpenReportModal, setIsOpenReportModal] = useState(false);
  
  const [counter, setCounter] = useState(3);// đọc đủ 20s mới tính view và lưu lịch sử đọc truyện

  const [visitedStory, setVisitedStory] = useState({
    _id: "",
    name: "",
    slug: "",
    url: "",
    chap: "",
  });
  // bộ đếm về 0 thì tính view và lưu lịch sử đọc truyện
  useEffect(() => {
    if (counter === 0) {
        return;
    }
    const timer = setInterval(() => {
        setCounter(prevCounter => prevCounter - 1);
    }, 1000);

    return () => clearInterval(timer);
}, [counter]);

  // call api
  useEffect(() => {
    const fetchStory = async () => {
      try {
        const res = await storyApi.getStory(storyID);
        setStory(res.data);
        navigate(`/story/${storyName}/${storyID}/chap-${currentChapter}`);
      } catch (error) {
        navigate("/not-found");
      }
    };

    fetchStory();
  }, [storyID, currentChapter, navigate, storyName]);

  // fixed chapter-nav
  useEffect(() => {
    const handleScroll = () => {
      //console.log(navRef.current.getBoundingClientRect().top)
      const currentScrollPos = window.scrollY;
      setIsFixed(currentScrollPos > 314);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      if (!nextBtnRef.current.classList.contains(cx("disabled"))) {
        setCurrentChapter((prev) => prev + 1);
      }
    } 
    else if (event.key === "ArrowLeft") {
      if (!prevBtnRef.current.classList.contains(cx("disabled"))) {
        setCurrentChapter((prev) => prev - 1);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // chuyển chap và cuộn về đầu trang
  const handleNextChap = async() => {
    const nextChapter = currentChapter + 1;
    if (!nextBtnRef.current.classList.contains(cx("disabled"))) {
      setCurrentChapter(nextChapter);
      window.scrollTo(0, 0);
    }
  
    try {
      if(counter <=0){
        await readingStoryApi.addHistory(story.name, story.imgSrc, chap.slice(5), story.slug, story._id);
        await viewCountApi.incrViewCount(story._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePrevChap = async() => {
    const prevChapter = currentChapter - 1;
    if (!prevBtnRef.current.classList.contains(cx("disabled"))) {
      setCurrentChapter(prevChapter);
      window.scrollTo(0, 0);
    }
    try {
      if(counter <=0){
        await readingStoryApi.addHistory(story.name, story.imgSrc, chap.slice(5), story.slug, story._id);
        await viewCountApi.incrViewCount(story._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // chuyển hướng khi ấn vào thẻ select
  const handleChangeSelectedChap = (event) => {
    setCurrentChapter(parseInt(event.target.value));
  };

  if (!story) {
    return (
      <div className="text-center">
        <img src="/images/loading/loading.gif" alt="loading"/>
      </div>
    );
  }

  return (
    <div className={`${cx("chapter-detail")} ${themeClassName}`}>
      <Container fill>
        <div className={cx("chapter-header")}>
          <BreadCumb comicName={story?.name} />

          <h1>
            <div className={cx("name")}>
              <Link>
                {story?.name + " "}
              </Link>
              <span>
                -
                {" " + chap.replace("-"," ")}
              </span>
              <span className={cx("update")}>
                
              </span>
            </div>
          </h1>
        </div>

        <div className={cx("reading-control")}>
          <div className={cx("bug")}>
            <Link onClick={()=> setIsOpenReportModal(true)}>
              <PrimaryButton
                color="yellow"
                title="Báo lỗi"
                icon={faTriangleExclamation}
                iconPosition={"left"}
              />
            </Link>
            {
                isOpenReportModal && 
                <ReportModal 
                  onClick={setIsOpenReportModal} 
                  storyName={story.name}
                  atChapter={currentChapter}
                />
              }
          </div>
          <div className={`mb10 ${cx("alert")}`}>
            <FontAwesomeIcon icon={faInfoCircle} />
            <em>Sử dụng mũi tên trái (←) hoặc phải (→) để chuyển chapter</em>
          </div>

          <nav
            className={`${cx("chapter-nav")} ${isFixed ? cx("fixed") : ""}`}
            ref={navRef}
          >
            <Link to="/" className={cx("home")}>
              <FontAwesomeIcon icon={faHouseChimney} />
            </Link>

            <Link to={`/story/${storyName}/${storyID}`} className={cx("home")}>
              <FontAwesomeIcon icon={faList} />
            </Link>

            <Link
              className={`${cx("control-btn", "prev")} 
              ${
                currentChapter === 1 ? cx("disabled") : undefined
              }`}
              onClick={handlePrevChap}
              ref={prevBtnRef}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </Link>

            <ChapterSelect
              currentChapter={currentChapter}
              lastChap={story.newestChapter}
              handleChangeSelectedChap={handleChangeSelectedChap}
            />

            <Link
              className={`${cx("control-btn", "next")} 
                        ${
                          story.newestChapter === 1 || currentChapter === story.newestChapter
                          ? cx("disabled")
                          : undefined
                        }`}
              onClick={handleNextChap}
              ref={nextBtnRef}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </Link>

            <PrimaryButton
              color="green"
              title="Theo dõi"
              onClick={() => {}}
              icon={faHeart}
              iconPosition={"right"}
            />
          </nav>
        </div>
      </Container>

      <ImageList />

      <Container backgroundColor={themeClassName === "" ? "#fff" : "#252525"}>
        <div className={cx("reading-nav-bottom")}>
          <PrimaryButton
            disabled={story.newestChapter === currentChapter + 1}
            color="red"
            onClick={handlePrevChap}
            icon={faChevronLeft}
            iconPosition="left"
            title="Chap trước"
          />
          <span className="mr8"></span>
          <PrimaryButton
            disabled={story.newestChapter === 1 || currentChapter === story.newestChapter}
            color="red"
            onClick={handleNextChap}
            icon={faChevronRight}
            iconPosition="right"
            title="Chap sau"
          />
        </div>
        <div className="pt15"></div>
        <BreadCumb comicName={story?.name} />
      </Container>

      <Container
        backgroundColor={themeClassName === "" ? "#f6f7f8" : "#252525"}
      >
        <div className="pb15">
          <CommentBox />
        </div>
      </Container>
    </div>
  );
}

export default ChapterDetail;
/*setVisitedStory({
          _id: res.data._id,
          name: res.data.name,
          slug: res.data.slug,
          url: res.data.url,
          chap: currentChapter,
        }); */