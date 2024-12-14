import React, {  useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams, useSearchParams } from "react-router-dom";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faAngleRight,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { faFileText } from "@fortawesome/free-regular-svg-icons";

import TopStory from "../TopStory/TopStory";
import BreadCumb from "@/components/BreadCumb/BreadCumb";
import CommentList from "@/components/CommentList/CommentList";
import StoryInfo from "./StoryInfo/StoryInfo";
import ChapterList from "./ChapterList/ChapterList";
import Grid from "../Layout/Grid/Grid";
import Row from "@/components/Layout/Row/Row";
import Col from "@/components/Layout/Col/Col";

import styles from "./StoryDetail.module.scss";
import useTheme from "@/customHook/useTheme";
import createQueryFn from "@/utils/createQueryFn";
import { getStoryById } from "@/api/storyApi";
import { getChaptersBystoryId } from "@/api/chapterApi";
import { getCommentsByStoryId } from "@/api/commentApi";
import toast from "react-hot-toast";

const cx = classNames.bind(styles);
function StoryDetail() {
  const themeClassName = useTheme(cx);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [seeMore, setSeeMore] = useState(false); // see more description
  const [viewMore, setViewMore] = useState(false); // view more chapter
  const { storyID } = useParams();

  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") || 1;

  const storyQuery = useQuery({
    enabled: !!storyID,
    queryKey: ["story", storyID],
    queryFn: createQueryFn(getStoryById),
    onError: (error) => {
      console.log(error);
    },
    staleTime: 0,
  });
  // getChapter
  const chaptersQuery = useQuery({
    enabled: viewMore === false,
    queryKey: ["chapter", storyID],
    queryFn: createQueryFn(getChaptersBystoryId),
    onError: (error) => {
      toast.error("Có lỗi xảy ra. Vui lòng quay lại sau!", {
        style: {
          fontSize: "14px",
        },
        duration: 3000,
        position: "top-center",
      });
    },
    cacheTime: 0,
  });

  // get comment of story
  const  {data : comments} = useQuery({
    queryKey: ["storyComments", storyID, page],
    queryFn: createQueryFn(getCommentsByStoryId),
  })


  if (!storyQuery.data) {
    return (
      <div className="text-center">
        <img src="/images/loading/loading.gif" alt="loading" />
      </div>
    );
  }

  return (
    <div className={cx("story-detail", themeClassName)}>
      {storyQuery.data && (
        <Grid>
          <Row>
            <Col sizeLg={8} sizeMd={12}>
              <BreadCumb comicName={storyQuery.data.name} />

              <h1 className={cx("title")}>{storyQuery.data.name}</h1>
              <time className={cx("time-text")}>
                [ Cập nhật lúc: {storyQuery.data.updatedAt}]
              </time>

              <StoryInfo
                story={storyQuery.data}
                isAuthenticated={isAuthenticated}
              />

              <Row>
                <div className={cx("description")}>
                  <h3>
                    <FontAwesomeIcon icon={faFileText} className="mr4" />
                    Nội dung
                  </h3>

                  <p className={seeMore ? cx("see-more") : ""}>
                    {storyQuery.data.description}
                    <span
                      className={!seeMore ? cx("mask-gradient") : ""}
                    ></span>
                  </p>
                  <Link onClick={() => setSeeMore(!seeMore)}>
                    {!seeMore && (
                      <FontAwesomeIcon icon={faAngleLeft} className="mr4" />
                    )}
                    {!seeMore ? "Xem thêm" : "Thu gọn"}
                    {seeMore && (
                      <FontAwesomeIcon icon={faAngleRight} className="ml4" />
                    )}
                  </Link>
                </div>

                <div className={cx("chapter-list")}>
                  <h2>
                    <FontAwesomeIcon icon={faList} className="mr4" />
                    Danh sách chương
                  </h2>
                </div>

                <ChapterList
                  data={chaptersQuery.data}
                  setViewMore={setViewMore}
                  viewMore={viewMore}
                />
              </Row>
              {comments && <CommentList data={comments.data} />}
            </Col>

            <Col sizeLg={4} sizeXs={12}>
              <TopStory />
            </Col>
          </Row>
        </Grid>
      )}
    </div>
  );
}

export default StoryDetail;
