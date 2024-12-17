import { useState, useEffect, useRef } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import classNames from "classnames/bind";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

import BreadCumb from "@/components/BreadCumb/BreadCumb";
import PrimaryButton from "../Button/PrimaryButton/PrimaryButton";
import Container from "../Layout/Container/Container";
import ChapterImageList from "./ChapterImageList/ChapterImageList";
import ChapterHeader from "./ChapterHeader/ChapterHeader";
import CommentList from "../CommentList/CommentList";

import styles from "./ChapterDetail.module.scss";
import useTheme from "@/customHook/useTheme";
import createQueryFn from "@/utils/createQueryFn";
import {
  getChapterByStoryIdAndChap,
  getChapterResource,
  increaseView,
} from "@/api/chapterApi";
import { getStoryById } from "@/api/storyApi";
import { getCommentsByChapterId } from "@/api/commentApi";
import addReadingHistoryOnLocal from "@/utils/addReadingHistoryOnLocal";
import { increaseExperence } from "@/api/levelApi";
import { useSelector } from "react-redux";
import { updateReadingHistory } from "@/api/readingHistoryApi";

const cx = classNames.bind(styles);

function ChapterDetail() {
  const nextBtnRef = useRef();
  const prevBtnRef = useRef();

  const themeClassName = useTheme(cx);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const { storyName, storyID, chap } = useParams();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;

  const [currentChapter, setCurrentChapter] = useState(+chap.slice(5));

  // get story
  const { data: story } = useQuery({
    enabled: !!storyID,
    queryKey: ["story", storyID],
    queryFn: createQueryFn(getStoryById),
    staleTime: 5 * 60 * 1000,
  });
  // get chapter
  const { data: chapter } = useQuery({
    enabled: !!storyID && !!chap.slice(5),
    queryKey: ["chapter", storyID, parseInt(chap.slice(5))],
    queryFn: createQueryFn(getChapterByStoryIdAndChap),
  });
  // get resource
  const { data: resource } = useQuery({
    enabled: !!chapter?.id,
    queryKey: ["chapterResource", chapter?.id],
    queryFn: createQueryFn(getChapterResource),
  });

  // get comment
  const { data: comments } = useQuery({
    enabled: !!chapter?.id,
    queryKey: ["storyComments", chapter?.id, page],
    queryFn: createQueryFn(getCommentsByChapterId),
  });
  // increase view mutation
  const increaseViewMutation = useMutation({
    mutationFn: increaseView,
    onSuccess: () => {
      console.log("Increase view successfull");
    },
    onError: () => {
      console.log("Increase view failed");
    },
  });
  // increase level
  const increaseExperenceMutation = useMutation({
    mutationFn: increaseExperence,
    onSuccess: () => {
      console.log("Increase experence successfull");
    },
    onError: () => {
      console.log("Increase experence failed");
    },
  });

  //add reading history in server
  const updateReadingHistoryMutation = useMutation({
    mutationFn: updateReadingHistory,
    onSuccess: ()=> {
      console.log("Update reading history successfull");
    },
    onError: ()=>{
      console.log("Update reading history failed");
    }
  })

  useEffect(() => {
    // khi đọc đủ 10 giây mới tăng view
    // lưu lịch sử đọc truyện trên storage

    const delay = setTimeout(() => {
      addReadingHistoryOnLocal(
        {
          id: story.id,
          slug: story.slug,
          name: story.name,
          imgSrc: story.imgSrc,
          updatedAt: story.updatedAt,
          newestChapter: story.newestChapter,
          viewCount: story.viewCount,
        },
        +chap.slice(5)
      );

      increaseViewMutation.mutate({
        storyId: storyID,
        chapterId: chapter?.id,
      });

      updateReadingHistoryMutation.mutate({
        storyId: storyID,
        chapterRead: +chap.slice(5)
      });


      if (isAuthenticated) increaseExperenceMutation.mutate(chapter?.id);
    }, 10000);

    return () => clearTimeout(delay);
  }, [
    story,
    storyID,
    chapter,
    chap,
    increaseViewMutation,
    increaseExperenceMutation,
    updateReadingHistoryMutation,
    isAuthenticated
  ]);

  //handle navigate when changing chapter
  useEffect(() => {
    navigate(`/story/${storyName}/${storyID}/chap-${currentChapter}`);
  }, [currentChapter, navigate, storyID, storyName]);

  // ******* HANDLE CHANGE CHAPTER BUTTON *******

  const handleNextChap = () => {
    const nextChapter = currentChapter + 1;
    if (!nextBtnRef.current.classList.contains(cx("disabled"))) {
      setCurrentChapter(nextChapter);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevChap = () => {
    const prevChapter = currentChapter - 1;
    if (!prevBtnRef.current.classList.contains(cx("disabled"))) {
      setCurrentChapter(prevChapter);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className={`${cx("chapter-detail")} ${themeClassName}`}>
      {story && chapter && resource && (
        <>
          <ChapterHeader
            story={story}
            chapter={chapter}
            currentChapter={currentChapter}
            setCurrentChapter={setCurrentChapter}
            nextBtnRef={nextBtnRef}
            prevBtnRef={prevBtnRef}
            handleNextChap={handleNextChap}
            handlePrevChap={handlePrevChap}
          />

          <ChapterImageList data={resource} />

          <Container
            backgroundColor={themeClassName === "" ? "#fff" : "#252525"}
          >
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
                disabled={
                  story.newestChapter === 1 ||
                  currentChapter === story.newestChapter
                }
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
              {comments && <CommentList data={comments.data} />}
            </div>
          </Container>
        </>
      )}
    </div>
  );
}

export default ChapterDetail;
