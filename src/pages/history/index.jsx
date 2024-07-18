import { useEffect } from "react";
import { useSelector } from "react-redux";

import { NavBarModal } from "../../components/Modal";
import Head from "../../components/Head";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import ReadingHistory from "../../components/ReadingHistory";
function History() {
  const isOpen = useSelector((state) => state.navbar.isOpen);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Head />
      {isOpen ? (
        <NavBarModal />
      ) : (
        <>
          <NavBar />
          <ReadingHistory />
          <Footer />
        </>
      )}
    </>
  );
}

export default History;
