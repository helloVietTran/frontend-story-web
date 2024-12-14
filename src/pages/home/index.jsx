import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import Head from "@/components/Head/Head";
import NavBar from "@/components/NavBar/NavBar";
import Main from "@/components/Main/Main";
import Footer from "@/components/Footer/Footer";
import FollowedComicList from "@/components/FollowedComicList/FollowedComicList";
import HistoryList from "@/components/HistoryList/HistoryList";
import TopUser from "@/components/TopUser/TopUser";
import NewComment from "@/components/NewComment/NewComment";
import TopStory from "@/components/TopStory/TopStory";
import NavBarModal from "@/components/Modal/NavBarModal/NavBarModal";

import createQueryFn from "@/utils/createQueryFn";
import { getStories } from "@/api/storyApi";

function Home() {
  const isOpen = useSelector((state) => state.navbar.isOpen);
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") || 1;

  const storiesQuery = useQuery({
    queryKey: ["stories", page],
    queryFn: createQueryFn(getStories),
    onError: (error) => {
      console.error("Error fetching stories:", error);
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Head />
      <NavBar />
      {isOpen ? (
        <NavBarModal />
      ) : (
        <>
          {storiesQuery?.data && (
            <>
              <Main
                title="Truyện mới cập nhật"
                isBreadcrumbHidden={true}
                data={storiesQuery.data}
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
      )}
    </>
  );
}
//storyQuery.data
export default Home;
