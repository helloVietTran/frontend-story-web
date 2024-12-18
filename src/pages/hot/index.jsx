import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import NavBarModal from "@/components/Modal/NavBarModal/NavBarModal";
import Head from "@/components/Head/Head";
import NavBar from "@/components/NavBar/NavBar";
import Main from "@/components/Main/Main";
import Footer from "@/components/Footer/Footer";
import TopStory from "@/components/TopStory/TopStory";

import createQueryFn from "@/utils/createQueryFn";
import { getHotStories } from "@/api/storyApi";

function Hot() {
  const isOpen = useSelector((state) => state.navbar.isOpen);
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") || 1;

  const storiesQuery = useQuery({
    queryKey: ["hotStories", page],
    queryFn: createQueryFn(getHotStories),
  });


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
          {storiesQuery?.data && (
            <>
              <NavBar />
              <Main title="Truyện hot nhất" data={storiesQuery.data}>
                <TopStory />
              </Main>
              <Footer />
            </>
          )}
        </>
      )}
    </>
  );
}

export default Hot;
