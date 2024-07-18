import { INCREMENT_CHAPTERS_READ, RESET_CHAPTERS_READ } from "../actions/actionTypes";
const initState = {
  chaptersRead: 0,
};
const readReducer = (state = initState, action) => {
  switch (action.type) {
    case INCREMENT_CHAPTERS_READ:
      return {
        ...state,
        chaptersRead: state.chaptersRead + 1,
      };
    case  RESET_CHAPTERS_READ : 
      return {
        ...state, 
        chaptersRead: 0
      }
    default:
      return state;
  }
};
export default readReducer;
