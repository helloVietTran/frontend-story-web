import { useEffect } from "react";
import { useSelector } from "react-redux";

import { NavBarModal } from "../../components/Modal";
import Head from "../../components/Head";
import NavBar from "../../components/NavBar";
import Main from "../../components/Main";
import Footer from "../../components/Footer";
import TopStory from "../../components/TopStory";

function GirlStory() {
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
          <Main title="Truyện con gái" queryField="girl-story">
            <TopStory />
          </Main>
          <Footer />
        </>
      )}
    </>
  );
}

export default GirlStory;
