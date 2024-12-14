import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
};

const navbarSlice = createSlice({
  name: 'navbar', // Tên của slice
  initialState,
  reducers: {
    // chuyển trạng thái mở/đóng navbar
    toggleNavbar(state) {
      state.isOpen = !state.isOpen;  
    },
    //  mở navbar
    openNavbar(state) {
      state.isOpen = true;  
    },
    //  để đóng navbar
    closeNavbar(state) {
      state.isOpen = false; 
    }
  }
})

export const { toggleNavbar, openNavbar, closeNavbar } = navbarSlice.actions;

export default navbarSlice.reducer;
