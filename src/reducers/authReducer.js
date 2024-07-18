import { LOGIN, LOGOUT, UPDATE_USER} from "../actions/auth"
const initialState = {
  isAuthenticated: false,
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
      case LOGIN:
          return {
              ...state,
              isAuthenticated: true,
              user: action.payload.user,
          };
      case LOGOUT:
          return {
              ...state,
              isAuthenticated: false,
              user: null,
          };
      case  UPDATE_USER: 
          return{
            ...state,
            user: action.payload.user,
          }
      default:
          return state;
  }
};

export default authReducer;