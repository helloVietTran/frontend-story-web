import { useEffect } from "react";
import { useSelector } from "react-redux";

import  NavBarModal from "@/components/Modal/NavBarModal/NavBarModal";
import DefaultLayout from "@/components/Layout/DefaultLayout/DefaultLayout";
import Container from "@/components/Layout/Container/Container";
import Head from "@/components/Head/Head";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";
import ComicFilter from "@/components/ComicFilter/ComicFilter";
import BreadCumb from "@/components/BreadCumb/BreadCumb";

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
