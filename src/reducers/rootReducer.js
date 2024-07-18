import { combineReducers  } from "redux";

import themeReducer from "./themeReducer";
import authReducer from './authReducer';
import navbarReducer from "./navbarReducer";

const rootReducer = combineReducers({
    theme: themeReducer,
    auth: authReducer, 
    navbar: navbarReducer,
})
export default rootReducer;