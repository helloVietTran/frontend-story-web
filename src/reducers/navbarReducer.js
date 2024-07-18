import { TOGGLE_NAVBAR, OPEN_NAVBAR, CLOSE_NAVBAR } from '../actions/navbar';

const initialState = {
  isOpen: false,
};

const navbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_NAVBAR:
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    case OPEN_NAVBAR:
      return {
        ...state,
        isOpen: true,
      };
    case CLOSE_NAVBAR:
      return {
        ...state,
        isOpen: false,
      };
    default:
      return state;
  }
};

export default navbarReducer;
