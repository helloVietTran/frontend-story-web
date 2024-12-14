import { useState, useEffect } from "react";
import {
  useParams,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import queryString from "query-string";
import classNames from "classnames/bind";
import { faEye, faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import { faList } from "@fortawesome/free-solid-svg-icons";

import Grid from "../Layout/Grid/Grid";
import Row from "@/components/Layout/Row/Row";
import Col from "@/components/Layout/Col/Col";
import FilterButton  from "@/components/Button/FilterButton/FilterButton";
import GenreSelect from "../GenreSelect/GenreSelect";
import StoryCard from "../StoryCard/StoryCard";

import { options } from "@/config/filter";
import useTheme from "@/customHook/useTheme";
import styles from "./Sort.module.scss";

const cx = classNames.bind(styles);
function Sort({ searchByGenresData }) {
  const [activeNavLink, setActiveNavLink] = useState("");

  const [searchParams] = useSearchParams({ status: "-1", sort: "1" });
  const { genre } = useParams();
  const location = useLocation();
  const themeClassName = useTheme(cx);

  const genreFeild = options.find((option) => option.path.includes(genre));

  useEffect(() => {
    const checkLinkActive = () => {
      if (isActive("status", "-1")) {
        setActiveNavLink("item 1");
      } else if (isActive("status", "1")) {
        setActiveNavLink("item 2");
      } else if (isActive("status", "2")) {
        setActiveNavLink("item 3");
      } else if (isActive("sort", "1")) {
        setActiveNavLink("item 4");
      } else if (isActive("sort", "2")) {
        setActiveNavLink("item 5");
      } else if (isActive("sort", "10")) {
        setActiveNavLink("item 6");
      } else if (isActive("sort", "11")) {
        setActiveNavLink("item 7");
      } else if (isActive("sort", "20")) {
        setActiveNavLink("item 8");
      } else if (isActive("sort", "21")) {
        setActiveNavLink("item 9");
      } else if (isActive("sort", "22")) {
        setActiveNavLink("item 10");
      }
    };
    checkLinkActive();
    return () => setActiveNavLink(null);
  }, [searchParams]);

  // hàm thêm query vào url
  const generateQueryString = (queries) => {
    const currentParams = queryString.parse(location.search);
    const combinedParams = { ...currentParams, ...queries };
    return queryString.stringify(combinedParams);
  };

  // hàm check xem có thêm query mặc định hay không
  const shouldUseDefaultQuery = () => {
    const currentParams = queryString.parse(location.search);
    return Object.keys(currentParams).length === 0;
  };

  // xử lí sự so khớp path NavLink bằng query và url
  const isActive = (paramName, paramValue) => {
    return searchParams.get(paramName) === paramValue;
  };
  return (
    <div className={`${cx("sort")} ${themeClassName}`}>
      <h1>
        {genreFeild === undefined ? "Tìm truyện tranh" : "Truyện thể loại "}
        <b>{genreFeild === undefined ? null : genreFeild.name}</b>
      </h1>

      <div className={cx('hide')}>
        <GenreSelect 
          options={options}
        />
      </div>
      <div className={cx("genre-description")}>
        <p>
          {genreFeild === undefined
            ? "Tất cả thể loại truyện tranh"
            : genreFeild.description}
        </p>
      </div>

      <ul className={cx("nav-tabs")}>
        <FilterButton
          label="Tất cả"
          pathName={location.pathname}
          search={generateQueryString({ status: -1 })}
          activeNavLink={activeNavLink}
          name="item 1"
        />
        <FilterButton
          label="Hoàn thành"
          pathName={location.pathname}
          search={generateQueryString({ status: 1 })}
          activeNavLink={activeNavLink}
          name="item 2"
        />
        <FilterButton
          label="Đang tiến hành"
          pathName={location.pathname}
          search={generateQueryString({ status: 2 })}
          activeNavLink={activeNavLink}
          name="item 3"
        />
      </ul>
      <div className={cx("sort-by-row")}>
        <Grid>
          <Row>
            <Col sizeLg={3}>
              <span>Sắp xếp theo:</span>
            </Col>
            <Col sizeLg={9}>
              <ul className={cx("sort-list")}>
                <FilterButton
                  pathName={location.pathname}
                  label="Ngày cập nhật"
                  search={
                    shouldUseDefaultQuery()
                      ? generateQueryString({ sort: 1, status: -1 })
                      : generateQueryString({ sort: 1 })
                  }
                  orangeActive={isActive("sort", "1")}
                />
                <FilterButton
                  pathName={location.pathname}
                  label="Truyện mới"
                  search={
                    shouldUseDefaultQuery()
                      ? generateQueryString({ sort: 2, status: -1 })
                      : generateQueryString({ sort: 2 })
                  }
                  orangeActive={isActive("sort", "2")}
                />
                <FilterButton
                  pathName={location.pathname}
                  label="Top tháng"
                  search={
                    shouldUseDefaultQuery()
                      ? generateQueryString({ sort: 10, status: -1 })
                      : generateQueryString({ sort: 10 })
                  }
                  orangeActive={isActive("sort", "10")}
                  icon={faEye}
                />
                <FilterButton
                  pathName={location.pathname}
                  label="Top tuần"
                  search={
                    shouldUseDefaultQuery()
                      ? generateQueryString({ sort: 11, status: -1 })
                      : generateQueryString({ sort: 11 })
                  }
                  orangeActive={isActive("sort", "11")}
                  icon={faEye}
                />
                <FilterButton
                  pathName={location.pathname}
                  label="Top ngày"
                  search={
                    shouldUseDefaultQuery()
                      ? generateQueryString({ sort: 12, status: -1 })
                      : generateQueryString({ sort: 12 })
                  }
                  orangeActive={isActive("sort", "12")}
                  icon={faEye}
                />

                <FilterButton
                  pathName={location.pathname}
                  label="Theo dõi"
                  search={
                    shouldUseDefaultQuery()
                      ? generateQueryString({ sort: 20, status: -1 })
                      : generateQueryString({ sort: 20 })
                  }
                  orangeActive={isActive("sort", "20")}
                  icon={faHeart}
                />
                <FilterButton
                  pathName={location.pathname}
                  label="Bình luận"
                  search={
                    shouldUseDefaultQuery()
                      ? generateQueryString({ sort: 21, status: -1 })
                      : generateQueryString({ sort: 21 })
                  }
                  orangeActive={isActive("sort", "21")}
                  icon={faComment}
                />
                <FilterButton
                  pathName={location.pathname}
                  label="Số chapters"
                  search={
                    shouldUseDefaultQuery()
                      ? generateQueryString({ sort: 22, status: -1 })
                      : generateQueryString({ sort: 22 })
                  }
                  orangeActive={isActive("sort", "22")}
                  icon={faList}
                />
              </ul>
            </Col>
            {searchByGenresData.length > 0 &&
              searchByGenresData.map((item) => {
                return (
                  <Col 
                  sizeLg={3}
                  sizeMd={4}
                  sizeXs={6}
                  key={item._id}>
                    <StoryCard item={item} />
                  </Col>
                );
              })}
          </Row>
        </Grid>
      </div>
    </div>
  );
}

export default Sort;
