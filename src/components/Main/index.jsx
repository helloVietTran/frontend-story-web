import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types"

import { DefaultLayout, Container, Grid, Row, Col  } from "../Layout"
import { PrimaryHeading } from "../Heading";
import SliderHome from "../SliderHome";
import StoryList from "../StoryList";
import BreadCumb from "../BreadCumb";
import Pagination from "../Pagination";

function Main({ children, title, isBreadcrumbHidden , queryField }) { 
  return (
      <DefaultLayout>
          <Container
            isBackgroundVisible
            shouldApplyPadding
          >
          
          {!isBreadcrumbHidden ? <BreadCumb /> : null}
          <SliderHome />
          <Grid>
            <Row>
              <Col
                sizeLg={8}
                sizeXs={12}
              >
                <PrimaryHeading 
                  title={title}
                  size={2}
                  top={20}
                  icon={faAngleRight}
                />
               
                <StoryList queryField={queryField} />
                <Pagination queryField={queryField} />
               </Col>
              <Col 
                sizeLg={4}
                sizeXs={12}   
              >
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
  queryField: PropTypes.string

}
export default Main;
