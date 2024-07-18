const deleteLocalHistory = (id, setReadingHistoryData) => {
    let readingHistory = JSON.parse(localStorage.getItem("visited_stories")) || [];
    readingHistory = readingHistory.filter((item) => item._id !== id);
    localStorage.setItem("visited_stories", JSON.stringify(readingHistory));
    setReadingHistoryData((prevData) =>
        prevData.filter((item) => item._id !== id)
    );
};
export default deleteLocalHistory