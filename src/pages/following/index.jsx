import { useEffect } from "react";
import { useSelector } from "react-redux";

import NavBarModal  from "@/components/Modal/NavBarModal/NavBarModal";
import Head from "@/components/Head/Head";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";
import FollowStory from "@/components/FollowStory/FollowStory";

function Following() {
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
          <FollowStory />
          <Footer />
        </>
      )}
    </>
  );
}

export default Following;
