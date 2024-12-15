import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faHeart,
  faHouseChimney,
  faInfoCircle,
  faList,
  faTriangleExclamation,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import ChapterSelect from "../ChapterSelect/ChapterSelect";
import PrimaryButton from "@/components/Button/PrimaryButton/PrimaryButton";
import Container from "@/components/Layout/Container/Container";
import BreadCumb from "@/components/BreadCumb/BreadCumb";
import ReportModal from "@/components/Modal/ReportModal/ReportModal";

import styles from "./ChapterHeader.module.scss";
import { useSelector } from "react-redux";
import { followStory, unfollowStory } from "@/api/userApi";
import { getFollowedStoryByStoryId } from "@/api/storyApi";
import createQueryFn from "@/utils/createQueryFn";

const cx = classNames.bind(styles);

const ChapterHeader = ({
  story,
  chapter,
  currentChapter,
  setCurrentChapter,
  nextBtnRef,
  prevBtnRef,
  handleNextChap,
  handlePrevChap,
}) => {
  const navRef = useRef();
  const queryClient = useQueryClient();

  const [isOpenReportModal, setIsOpenReportModal] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);

  const { storyName, storyID } = useParams();
  const { isAuthenticated } = useSelector((state) => state.auth);

  // define query
  const { data: myFollowedStory, isSuccess } = useQuery({
    enabled: !!storyID,
    queryKey: ["myFollowedStory", storyID],
    queryFn: createQueryFn(getFollowedStoryByStoryId),
  });

  // followed status
  useEffect(() => {
    if (isSuccess) setIsFollowed(true);
    else setIsFollowed(false);
  }, [isSuccess]);

  const toastStyles = {
    fontSize: "14px",
  };
  // define mutation
  const followMutation = useMutation({
    mutationFn: followStory,
    onSuccess: () => {
      queryClient.invalidateQueries(["myFollowedStory", storyID]);
      setIsFollowed(true);
    },
    onError: (error) => {
      toast.error("Có lỗi xảy ra. Vui lòng quay lại sau!", {
        style: toastStyles,
        duration: 3000,
        position: "top-center",
      });
    },
  });

  const unfollowMutation = useMutation({
    mutationFn: unfollowStory,
    onSuccess: () => {
      queryClient.invalidateQueries(["myFollowedStory", storyID]);
      setIsFollowed(false);
    },
    onError: () => {
      toast.error("Có lỗi xảy ra. Vui lòng quay lại sau!", {
        style: toastStyles,
        duration: 3000,
        position: "top-center",
      });
    },
  });

  //****************** HANHDLE SCROLL NAVBAR****************
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 50) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ************** HANDLE CHANGE CHAPTER **************
  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      if (!nextBtnRef.current.classList.contains(cx("disabled"))) {
        setCurrentChapter((prev) => prev + 1);
      }
    } else if (event.key === "ArrowLeft") {
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

  // chuyển hướng khi ấn vào thẻ select
  const handleChangeSelectedChap = (event) => {
    setCurrentChapter(parseInt(event.target.value));
  };

  const handleFollowStory = async (id) => {
    if (!isAuthenticated) {
      toast.error("Vui lòng đăng nhập để theo dõi truyện", {
        style: toastStyles,
      });
      return;
    }

    followMutation.mutate(storyID);
  };

  const handleUnFollowStory = async () => {
    if (!myFollowedStory) return;

    unfollowMutation.mutate({
      followId: myFollowedStory.id,
      storyId: storyID,
    });
  };

  return (
    <Container fill>
      <div className={cx("chapter-header")}>
        <BreadCumb comicName={story.name} />

        <h1>
          <div className={cx("name")}>
            <Link>{story.name + " "}</Link>
            <span>-{" Chap " + chapter.chap}</span>
            <span className={cx("update")}>{chapter.updatedAt || ""}</span>
          </div>
        </h1>
      </div>

      <div className={cx("reading-control")}>
        <div className={cx("bug")}>
          <Link onClick={() => setIsOpenReportModal(true)}>
            <PrimaryButton
              color="yellow"
              title="Báo lỗi"
              icon={faTriangleExclamation}
              iconPosition={"left"}
            />
          </Link>

          {isOpenReportModal && (
            <ReportModal
              onClick={setIsOpenReportModal}
              storyName={story.name}
              atChapter={currentChapter}
            />
          )}
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
                          ${currentChapter === 1 ? cx("disabled") : undefined}`}
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
                          story.newestChapter === 1 ||
                          currentChapter === story.newestChapter
                            ? cx("disabled")
                            : undefined
                        }`}
            onClick={handleNextChap}
            ref={nextBtnRef}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </Link>

          {isFollowed ? (
            <PrimaryButton
              color="red"
              title="Bỏ theo dõi"
              onClick={handleUnFollowStory}
              icon={faXmark}
              iconPosition={"right"}
            />
          ) : (
            <PrimaryButton
              color="green"
              title="Theo dõi"
              onClick={handleFollowStory}
              icon={faHeart}
              iconPosition={"right"}
            />
          )}
        </nav>
      </div>
    </Container>
  );
};

ChapterHeader.propTypes = {
  story: PropTypes.object.isRequired,
  chapter: PropTypes.object.isRequired,
  currentChapter: PropTypes.number.isRequired,
  setCurrentChapter: PropTypes.func.isRequired,
  nextBtnRef: PropTypes.object.isRequired,
  prevBtnRef: PropTypes.object.isRequired,
  handleNextChap: PropTypes.func.isRequired,
  handlePrevChap: PropTypes.func.isRequired,
};

export default ChapterHeader;
