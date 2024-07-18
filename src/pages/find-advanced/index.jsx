import { useEffect } from "react";
import { useSelector } from "react-redux";

import { NavBarModal } from "../../components/Modal";
import { DefaultLayout, Container } from "../../components/Layout";
import Head from "../../components/Head";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import ComicFilter from "../../components/ComicFilter";
import BreadCumb from "../../components/BreadCumb";

function FindAdvanced() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const isOpen = useSelector((state) => state.navbar.isOpen);
  return (
    <>
      <Head />
      {isOpen ? (
        <NavBarModal />
      ) : (
        <>
          <NavBar />
          <DefaultLayout>
            <Container shouldApplyPadding isBackgroundVisible>
              <BreadCumb />
              <ComicFilter />
            </Container>
          </DefaultLayout>
          <Footer />
        </>
      )}
    </>
  );
}

export default FindAdvanced;
