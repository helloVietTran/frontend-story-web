import { useEffect } from "react";
import { useSelector } from "react-redux";

import Head from "../../components/Head";
import NavBar from "../../components/NavBar";
import Main from "../../components/Main";
import Footer from "../../components/Footer";
import FollowedComicList from "../../components/FollowedComicList";
import HistoryList from "../../components/HistoryList";
import TopUser from "../../components/TopUser";
import NewComment from "../../components/NewComment";
import TopStory from "../../components/TopStory";
import { NavBarModal } from "../../components/Modal";

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isOpen = useSelector((state) => state.navbar.isOpen);

  return (
    <>
      <Head />
      <NavBar />
      {isOpen ? (
        <NavBarModal />
      ) : (
        <>
          <Main
            title="Truyện mới cập nhật"
            isBreadcrumbHidden={true}
            queryField="all"
          >
            <FollowedComicList />
            <HistoryList />
            <TopStory />
            <TopUser />
            <NewComment />
          </Main>
          <Footer />
        </>
      )}
    </>
  );
}

export default Home;
