import { useEffect } from "react";
import { useSelector } from "react-redux";

import  NavBarModal from "@/components/Modal/NavBarModal/NavBarModal";
import NavBar from "@/components/NavBar/NavBar";
import Head from "@/components/Head/Head";
import Footer from "@/components/Footer/Footer";
import ChapterDetail from "@/components/ChapterDetail/ChapterDetail";

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
