import { createSlice } from '@reduxjs/toolkit';

// Khởi tạo state với giá trị từ localStorage
const initialState = {
  darkTheme: JSON.parse(localStorage.getItem('darkTheme')) || false,  // Đảm bảo là boolean
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state) {
      const newDarkTheme = !state.darkTheme;
      console.log(state.darkTheme);
      localStorage.setItem('darkTheme', JSON.stringify(newDarkTheme)); // Lưu vào localStorage
      state.darkTheme = newDarkTheme;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
