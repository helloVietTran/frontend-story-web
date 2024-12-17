import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleUp, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";

import Grid from "../Layout/Grid/Grid";
import Row from "../Layout/Row/Row";
import Col from "../Layout/Col/Col";
import StoryCard from "../StoryCard/StoryCard";

import styles from "./ComicFilter.module.scss";
import useTheme from "@/customHook/useTheme";
import { options } from "@/config/filter";
import createQueryFn from "@/utils/createQueryFn";
import { findAdvanced } from "@/api/storyApi";
const cx = classNames.bind(styles);

function ComicFilter() {
  const [isOpen, setIsOpen] = useState(true);

  const [checkedItems, setCheckedItems] = useState({});
  const [minchapter, setMinchapter] = useState("0");
  const [sort, setSort] = useState("-1");
  const [status, setStatus] = useState("-1");
  const [gender, setGender] = useState("0");

  const navigate = useNavigate();
  const themeClassName = useTheme(cx);
  const [searchParams] = useSearchParams();

  const genreParam = searchParams.get("genreCodes") || null;
  const notGenreParam = searchParams.get("notGenreCodes") || "";
  const sortParam = searchParams.get("sort") || "-1";
  const genderParam = searchParams.get("gender") || "0";
  const statusParam = searchParams.get("status") || "-1";
  const minChapterParam = searchParams.get("minchapter") || "0";

  const comicFilter = options.slice(1);
  const length = comicFilter.length;

  const { data } = useQuery({
    queryKey: ["findAdvanced", genreParam, notGenreParam, statusParam, sortParam, minChapterParam, genderParam ],
    queryFn: createQueryFn(findAdvanced),
    retryDelay: ()=> 10000
  })


  // dựa vào queryCode
  const handleToggle = (index) => {
    setCheckedItems((prevCheckedItems) => {
      const newCheckedItems = { ...prevCheckedItems };

      if (newCheckedItems[index] === "tick") newCheckedItems[index] = "cross";
      else if (newCheckedItems[index] === "cross")
        delete newCheckedItems[index];
      else newCheckedItems[index] = "tick";

      return newCheckedItems;
    });
  };


  const handleAppend = () => {
    const genres = [];
    const notGenres = [];

    Object.entries(checkedItems).forEach(([index, value]) => {
      if (value === "tick") genres.push(index);
      else if (value === "cross") notGenres.push(index);
    });

    const queryParams = new URLSearchParams();

    if (genres.length > 0) queryParams.append("genreCodes", genres.join(","));

    queryParams.append("notGenreCodes", notGenres.join(","));

    //nếu là default query thì không đưa lên query param
    if (minchapter !== "0") queryParams.append("minChapter", minchapter);

    if (status !== "-1") queryParams.append("status", status);

    if (sort !== "-1") queryParams.append("sort", sort);

    if (gender !== "0") queryParams.append("gender", gender);

    navigate(`?${queryParams.toString()}`);
    // đặt lại state

    setCheckedItems({});
    setStatus("-1");
    setSort("-1");
    setGender("0");
    setMinchapter("0");
  };

  // đặt lại state
  const handleReset = () => {
    setCheckedItems({});
    setStatus("-1");
    setSort("-1");
    setGender("0");
    setMinchapter("0");
  };

  return (
    <div className={`${cx("comic-filter")} ${themeClassName}`}>
      <div className="mb10 text-center">
        <h1 className={cx("title")}>Tìm truyện nâng cao</h1>
      </div>
      <div className="mb5 text-center">
        <button
          className={cx("hide-btn")}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "Ẩn khung tìm kiếm" : "Hiện khung tìm kiếm"}
          {isOpen && <FontAwesomeIcon icon={faAngleDoubleUp} />}
        </button>
      </div>

      {isOpen && (
        <div className={cx("filter-wrap")}>
          <p className="mb5 mt20">
            <span className="icon-tick"></span>
            Tìm trong những thể loại này
          </p>
          <p className="mb5">
            <span className="icon-cross"></span>
            Loại trừ những thể loại này
          </p>
          <p className="mb20 relative">
            <span className="icon-checkbox"></span>
            Truyện có thể hoặc không thuộc thể loại này
            <Link to="/find-advanced" onClick={handleReset}>
              <FontAwesomeIcon icon={faRefresh} />
              Reset
            </Link>
          </p>

          <Grid>
            <Row>
              <Col sizeMd={2} sizeXs={12}>
                <h3 className="mt5">Thể loại </h3>
              </Col>

              <Col sizeLg={10} sizeXs={12}>
                <Row>
                  <Col sizeMd={3} sizeXs={6}>
                    {comicFilter.slice(0, Math.ceil(length / 4)).map((item) => {
                      return (
                        <div
                          key={item.name}
                          className={cx("genre-item")}
                          onClick={() => handleToggle(item.queryCode)}
                        >
                          <span
                            className={
                              checkedItems[item.queryCode] === "tick"
                                ? "icon-tick"
                                : checkedItems[item.queryCode] === "cross"
                                ? "icon-cross"
                                : "icon-checkbox"
                            }
                          ></span>
                          {item.name}
                        </div>
                      );
                    })}
                  </Col>

                  <Col sizeMd={3} sizeXs={6}>
                    {comicFilter
                      .slice(Math.ceil(length / 4), Math.ceil(length / 2))
                      .map((item) => {
                        return (
                          <div
                            key={item.name}
                            className={cx("genre-item")}
                            onClick={() => handleToggle(item.queryCode)}
                          >
                            <span
                              className={
                                checkedItems[item.queryCode] === "tick"
                                  ? "icon-tick"
                                  : checkedItems[item.queryCode] === "cross"
                                  ? "icon-cross"
                                  : "icon-checkbox"
                              }
                            ></span>
                            {item.name}
                          </div>
                        );
                      })}
                  </Col>

                  <Col sizeMd={3} sizeXs={6}>
                    {comicFilter
                      .slice(Math.ceil(length / 2), Math.ceil((3 * length) / 4))
                      .map((item) => {
                        return (
                          <div
                            key={item.name}
                            className={cx("genre-item")}
                            onClick={() => handleToggle(item.queryCode)}
                          >
                            <span
                              className={
                                checkedItems[item.queryCode] === "tick"
                                  ? "icon-tick"
                                  : checkedItems[item.queryCode] === "cross"
                                  ? "icon-cross"
                                  : "icon-checkbox"
                              }
                            ></span>
                            {item.name}
                          </div>
                        );
                      })}
                  </Col>

                  <Col sizeMd={3} sizeXs={6}>
                    {comicFilter
                      .slice(Math.ceil((3 * length) / 4), length)
                      .map((item) => {
                        return (
                          <div
                            key={item.name}
                            className={cx("genre-item")}
                            onClick={() => handleToggle(item.queryCode)}
                          >
                            <span
                              className={
                                checkedItems[item.queryCode] === "tick"
                                  ? "icon-tick"
                                  : checkedItems[item.queryCode] === "cross"
                                  ? "icon-cross"
                                  : "icon-checkbox"
                              }
                            ></span>
                            {item.name}
                          </div>
                        );
                      })}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Grid>
          <div className="mb10"></div>
          <Grid>
            <Row>
              <Col sizeMd={2} sizeXs={12}>
                <h3>Số lượng chapter</h3>
              </Col>

              <Col sizeMd={4} sizeXs={12}>
                <select
                  value={minchapter}
                  onChange={(e) => setMinchapter(e.target.value)}
                >
                  <option value="0">&gt; 0 chapter</option>
                  <option value="50">&gt;= 50 chapter</option>
                  <option value="100">&gt;= 100 chapter</option>
                  <option value="200">&gt;= 200 chapter</option>
                  <option value="300">&gt;= 300 chapter</option>
                  <option value="400">&gt;= 400 chapter</option>
                  <option value="500">&gt;= 500 chapter</option>
                </select>
              </Col>

              <Col sizeMd={2} sizeXs={12}>
                <h3>Tình trạng</h3>
              </Col>
              <Col sizeMd={4} sizeXs={12}>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="-1">Tất cả</option>
                  <option value="1">Đang tiến hành</option>
                  <option value="2">Đã hoàn thành</option>
                </select>
              </Col>
            </Row>
          </Grid>

          <Grid>
            <Row>
              <Col sizeMd={2} sizeXs={12}>
                <h3>Dành cho</h3>
              </Col>
              <Col sizeMd={4} sizeXs={12}>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="-1">Tất cả</option>
                  <option value="1">Con gái</option>
                  <option value="2">Con trai</option>
                </select>
              </Col>

              <Col sizeMd={2} sizeXs={12}>
                <h3>Sắp xếp theo</h3>
              </Col>

              <Col sizeMd={4} sizeXs={12}>
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="22">Chapter mới nhất</option>
                  <option value="10">Xem nhiều nhất</option>
                  <option value="10">Xem nhiều nhất tháng</option>
                  <option value="10">Xem nhiều nhất tuần</option>
                  <option value="10">Xem nhiều nhất hôm nay</option>
                  <option value="20">Theo dõi nhiều nhất</option>
                  <option value="21">Bình luận nhiều nhất</option>
                </select>
              </Col>
            </Row>
          </Grid>

          <button
            type="button"
            className={cx("search-button")}
            onClick={handleAppend}
          >
            Tìm kiếm
          </button>
        </div>
      )}
      <Grid>
        <Row>
          {data && data.map((item) => {
            return (
              <Col sizeLg={3} sizeMd={4} sizeXs={6} key={item._id}>
                <StoryCard data={item} />
              </Col>
            );
          })}
        </Row>
      </Grid>
    </div>
  );
}

export default ComicFilter;
