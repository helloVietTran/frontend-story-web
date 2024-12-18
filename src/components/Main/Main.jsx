import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

import DefaultLayout from "../Layout/DefaultLayout/DefaultLayout";
import Container from "../Layout/Container/Container";
import Grid from "../Layout/Grid/Grid";
import Row from "../Layout/Row/Row";
import Col from "../Layout/Col/Col";
import PrimaryHeading from "../Heading/PrimaryHeading/PrimaryHeading";
import SliderHome from "../SliderHome/SliderHome";
import StoryCard from "../StoryCard/StoryCard";
import BreadCumb from "@/components/BreadCumb/BreadCumb";
import Pagination from "../Pagination/Pagination";
import { useEffect, useState } from "react";
import getReadingHistoriesFromLocal from "@/utils/getReadingHistoryFromLocal";

function Main({ children, title, isBreadcrumbHidden, data }) {
  const [localReadingHistories, setLocalReadingHistories] = useState([]);

  useEffect(() => {
    setLocalReadingHistories(getReadingHistoriesFromLocal());
  }, [setLocalReadingHistories]);
  
  return (
    <DefaultLayout>
      <Container isBackgroundVisible shouldApplyPadding>
        {!isBreadcrumbHidden ? <BreadCumb /> : null}
        <SliderHome />
        <Grid>
          <Row>
            <Col sizeLg={8} sizeXs={12}>
              <PrimaryHeading
                title={title}
                size={2}
                top={20}
                icon={faAngleRight}
              />

              <Grid>
                <Row>
                  {data.data.map((item) => {
                    return (
                      <Col sizeMd={3} sizeSm={4} sizeXs={6} key={item.id}>
                        <StoryCard
                          data={item}
                          readingHistoryData={localReadingHistories}// lịch sử đọc truyện từ local
                        />
                      </Col>
                    );
                  })}
                </Row>
              </Grid>

              <Pagination data={data} />
            </Col>
            <Col sizeLg={4} sizeXs={12}>
              {children}
            </Col>
          </Row>
        </Grid>
      </Container>
    </DefaultLayout>
  );
}

Main.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  isBreadcrumbHidden: PropTypes.bool,
};
export default Main;
