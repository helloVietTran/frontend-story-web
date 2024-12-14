import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import themeReducer from './themeSlice';
import navbarReducer from './navbarSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    navbar: navbarReducer,
  },
});

export default store;
