import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { NavBarModal } from "../../components/Modal";
import { options } from "../../config/filter";
import {
  DefaultLayout,
  Container,
  Grid,
  Row,
  Col,
} from "../../components/Layout";
import { storyApi } from "../../config/api";
import Head from "../../components/Head";
import NavBar from "../../components/NavBar";
import Sort from "../../components/Sort/Sort";
import Category from "../../components/Category";
import Footer from "../../components/Footer/Footer";
import BreadCumb from "../../components/BreadCumb";

function FindStory() {
  const isOpen = useSelector((state) => state.navbar.isOpen);

  const [genreParam, setGenreParam] = useState("");
  const [searchByGenresData, setSearchByGenresData] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  //tách lấy query
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status");
  const sort = queryParams.get("sort");

  useEffect(() => {
    const checkValidUrl = options.filter((option) =>
      option.path.includes(location.pathname)
    );
    if (checkValidUrl.length === 0) {
      navigate("/404");
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await storyApi.queryStory(genreParam, status, sort);
        setSearchByGenresData(res.data);
      } catch (err) {
        console.log("Can't find story by genre");
      }
    };

    fetchData();
  }, [genreParam, status, sort]);

  return (
    <>
      <Head />
      {isOpen ? (
        <NavBarModal />
      ) : (
        <>
          <NavBar />
          <DefaultLayout>
            <Container isBackgroundVisible shouldApplyPadding>
              <BreadCumb />
              <Grid>
                <Row>
                  <Col sizeLg={8}>
                    <Sort searchByGenresData={searchByGenresData} />
                  </Col>
                  <Col sizeLg={4}>
                    <Category setGenreParam={setGenreParam} />
                  </Col>
                </Row>
              </Grid>
            </Container>
          </DefaultLayout>
          <Footer />
        </>
      )}
    </>
  );
}

export default FindStory;
