import { useEffect } from "react";
import { useSelector } from "react-redux";

import { NavBarModal } from "../../components/Modal";
import NavBar from "../../components/NavBar";
import Head from "../../components/Head";
import Footer from "../../components/Footer";
import ChapterDetail from "../../components/ChapterDetail";

function Chapter() {
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
          <NavBar isPreventFixed={true} />
          <ChapterDetail />
          <Footer />
        </>
      )}
    </>
  );
}

export default Chapter;
