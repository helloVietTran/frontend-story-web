import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import StoryCard from "../StoryCard";
import {Grid, Row, Col} from "../Layout"
import { storyApi } from "../../config/api";

function StoryList({ queryField }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParam] = useSearchParams();
  
  const page = searchParam.get('page');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await storyApi.getStories(queryField, page);
        setData(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, [queryField, page]);
  
  return (
    <Grid >
      <Row>
      {data.map((item) => {
        return (
          <Col 
            sizeMd={3}
            sizeSm={4}
            sizeXs={6}
            key={item._id}
          >
            <StoryCard item={item} />
          </Col>
        );
      })}
      </Row>
    </Grid>
  );
}

export default StoryList;
