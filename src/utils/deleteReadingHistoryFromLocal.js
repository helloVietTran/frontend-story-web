const deleteReadingHistoryFromLocal = (id) => {
    let readingHistories =  JSON.parse(localStorage.getItem("local_reading_histories"));
    if(!readingHistories)
        return [];
  
    readingHistories = readingHistories.filter(item => item.id !== id);
    localStorage.setItem("local_reading_histories", JSON.stringify(readingHistories));
    // trả về mảng sau khi xóa
    return readingHistories;
};
export default deleteReadingHistoryFromLocal;