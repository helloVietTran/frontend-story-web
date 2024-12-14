import { useEffect } from "react";
import { useSelector } from "react-redux";

import NavBarModal from "@/components/Modal/NavBarModal/NavBarModal";
import NavBar from "@/components/NavBar/NavBar";
import Head from "@/components/Head/Head";
import Footer from "@/components/Footer/Footer";
import StoryDetail from "@/components/StoryDetail/StoryDetail";
import DefaultLayout from "@/components/Layout/DefaultLayout/DefaultLayout";
import Container  from "@/components/Layout/Container/Container";

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
