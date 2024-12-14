import { createSlice } from '@reduxjs/toolkit';

// Khởi tạo state với giá trị từ localStorage
const initialState = {
  darkTheme: localStorage.getItem('darkTheme') === false
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state) {
      const newDarkTheme = !state.darkTheme;
      
      localStorage.setItem('darkTheme', JSON.stringify(newDarkTheme)); 
      state.darkTheme = newDarkTheme; 
    },
  },
});


export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
