import { useEffect } from "react";
import { useSelector } from "react-redux";

import { NavBarModal } from "../../components/Modal";
import NavBar from "../../components/NavBar";
import Head from "../../components/Head";
import Footer from "../../components/Footer";
import StoryDetail from "../../components/StoryDetail";
import { DefaultLayout, Container } from "../../components/Layout";

function Story() {
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
          <DefaultLayout>
            <Container isBackgroundVisible shouldApplyPadding>
              <StoryDetail />
            </Container>
          </DefaultLayout>
          <Footer />
        </>
      )}
    </>
  );
}

export default Story;
