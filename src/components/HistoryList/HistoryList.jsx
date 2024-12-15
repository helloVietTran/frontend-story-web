import { useState, useEffect } from "react";

import ListHeading from "../Heading/ListHeading/ListHeading";
import ListFrame from "../List/ListFrame/ListFrame";
import PrimaryListItem from "../List/PrimaryListItem/PrimaryListItem";

import getReadingHistoriesFromLocal from "@/utils/getReadingHistoryFromLocal";
import deleteReadingHistoryFromLocal from "@/utils/deleteReadingHistoryFromLocal";

function HistoryList() {
  const [localReadingHistories, setLocalReadingHistories] = useState([]);

  useEffect(() => {
    setLocalReadingHistories(getReadingHistoriesFromLocal());
  }, []);
  
  const handleDelete = (id) => {
    setLocalReadingHistories(deleteReadingHistoryFromLocal(id));
  };

  return (
    <ListFrame>
      <ListHeading title="Lịch sử đọc truyện" path="/history" />

      {localReadingHistories.length > 0 ? (
        localReadingHistories.map((story) => {
          return (
            <PrimaryListItem
              data={story}
              hasDeleteBtn
              handleDeleteReadingHistory={handleDelete}
              key={story.id}
            />
          );
        })
      ) : (
        <p>Bạn không có lịch sử đọc truyện</p>
      )}
    </ListFrame>
  );
}

export default HistoryList;
