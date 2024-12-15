const getReadingHistoriesFromLocal = () => {
    return JSON.parse(localStorage.getItem("local_reading_histories")) || [];
}

export default getReadingHistoriesFromLocal;