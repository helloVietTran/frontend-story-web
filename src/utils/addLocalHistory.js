function addLocalHistory(visited_story) {
  let visitedStories =
    JSON.parse(localStorage.getItem("visited_stories")) || [];
  let existingIndex = visitedStories.findIndex(
    (item) => item.slug === visited_story.slug
  );
  if (existingIndex !== -1) {
    visitedStories[existingIndex] = visited_story;
  } else {
    visitedStories.push(visited_story);
  }
  localStorage.setItem("visited_stories", JSON.stringify(visitedStories));
}

export default addLocalHistory;