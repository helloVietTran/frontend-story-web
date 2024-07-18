import React, {useState, useEffect} from 'react';
import classNames from "classnames/bind";
import { Img } from "react-image";
import { useParams, useNavigate } from 'react-router-dom';

import { chapterApi } from '@/config/api';
import styles from "./ImageList.module.scss";

const cx = classNames.bind(styles);
const ImageList = () => {
  const {storyID, chap} = useParams();
  const navigate = useNavigate();
  const [chapter, setChapter] = useState();

  useEffect(()=> {
    const fetchChapter = async () => {
      try {
        const res = await chapterApi.getChapter(storyID, chap.slice(5));
        setChapter(res.data);
      } catch (error) {
        navigate("/not-found")
      }
    };

    fetchChapter();
  }, [storyID, chap, navigate])

  return (
    <div className={cx("img-list")}>
        {chapter?.imgSrcs.map((url) => {
          return (
            <Img
              src={url}
              key={url}
              loader={<img style={{display: "block"}} src="/images/loading/loading.gif" alt="loading"/>}
            />
          );
        })}
      </div>
  )
}

export default ImageList