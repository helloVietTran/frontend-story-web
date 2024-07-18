import { useState, useEffect } from "react";

import { ListHeading } from "../Heading";
import { ListFrame, PrimaryListItem } from "../List";
import deleteLocalHistory from "@/utils/deleteLocalHistory";

function HistoryList() {
  const [readingHistoryData, setReadingHistoryData] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("visited_stories"));
    if (data) {
      setReadingHistoryData(data);
    }
  }, []);
  const handleDeleteReadingHistory = (id) => {
    deleteLocalHistory(id, setReadingHistoryData);
  };

  return (
    <ListFrame>   
      <ListHeading 
        title="Lịch sử đọc truyện"
        path="/history"
      />

      {readingHistoryData &&
        readingHistoryData.map((story) => {
          return (
           <PrimaryListItem 
            data={story}
            hasDeleteBtn
            handleDeleteReadingHistory={()=>handleDeleteReadingHistory}
            key={story._id}
           />
          );
        })}
    </ListFrame>
  );
}

export default HistoryList;
