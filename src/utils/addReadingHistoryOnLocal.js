// id, slug, imgSrc, chaptersRead[], updatedAt, newestChapter, name, viewCount

function addReadingHistoryOnLocal(story, chapter) {
  let localReadingHistories =
    JSON.parse(localStorage.getItem("local_reading_histories")) || [];

  let existingIndex = localReadingHistories.findIndex(
    (item) => item.id === story.id
  );
  if (existingIndex !== -1) // tìm thấy
  {
    story.chaptersRead = localReadingHistories[existingIndex].chaptersRead;

    localReadingHistories[existingIndex] = story;
    // kiểm tra đã đọc chapter chưa, nếu chưa thì push vào
    if (!localReadingHistories[existingIndex].chaptersRead.includes(chapter)) {

      localReadingHistories[existingIndex].chaptersRead.push(chapter);
    }
  }
  else {
    story.chaptersRead = [];
    story.chaptersRead.push(chapter);

    localReadingHistories.push(story);
  }
  localStorage.setItem("local_reading_histories", JSON.stringify(localReadingHistories));
  console.log(JSON.stringify(localReadingHistories))

}

export default addReadingHistoryOnLocal;