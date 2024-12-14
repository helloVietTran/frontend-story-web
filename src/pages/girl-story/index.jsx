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

import { getStoriesByGender } from "@/api/storyApi";
import createQueryFn from "@/utils/createQueryFn";

function GirlStory() {
  const isOpen = useSelector((state) => state.navbar.isOpen);
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") || 1;

  const storyQuery = useQuery({
    queryKey: ["girlStories", "MALE", page],
    queryFn: createQueryFn(getStoriesByGender),
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

      {isOpen ? (
        <NavBarModal />
      ) : (
        <>
          {storyQuery.data?.data && (
            <>
              <NavBar />
              <Main title="Truyện con gái" data={storyQuery.data}>
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

export default GirlStory;
