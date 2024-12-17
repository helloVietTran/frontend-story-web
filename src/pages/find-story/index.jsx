import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import NavBarModal from "@/components/Modal/NavBarModal/NavBarModal";
import Head from "@/components/Head/Head";
import NavBar from "@/components/NavBar/NavBar";
import Sort from "@/components/Sort/Sort";
import Category from "@/components/Category/Category";
import Footer from "@/components/Footer/Footer";
import BreadCumb from "@/components/BreadCumb/BreadCumb";
import DefaultLayout from "@/components/Layout/DefaultLayout/DefaultLayout";
import Container from "@/components/Layout/Container/Container";
import Grid from "@/components/Layout/Grid/Grid";
import Row from "@/components/Layout/Row/Row";
import Col from "@/components/Layout/Col/Col";

import { options } from "@/config/filter";
import { useQuery } from "@tanstack/react-query";
import createQueryFn from "@/utils/createQueryFn";
import { findStory } from "@/api/storyApi";

function FindStory() {
  const isOpen = useSelector((state) => state.navbar.isOpen);

  const [genreCode, setGenreCode] = useState("");

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

    if (checkValidUrl.length === 0) navigate("/404");
  }, [location.pathname, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const {data} = useQuery({
    queryKey: ["filterStory", genreCode, status, sort],
    queryFn: createQueryFn(findStory),
    retryDelay: ()=> 3000
  })
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
                    <Sort data={data} />
                  </Col>
                  <Col sizeLg={4}>
                    <Category setGenreCode={setGenreCode} />
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
