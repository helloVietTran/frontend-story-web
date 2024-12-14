import { createSlice } from '@reduxjs/toolkit';

// Khởi tạo state ban đầu
const initialState = {
  chaptersRead: 0,
};

// Tạo slice cho chaptersRead
const chaptersReadSlice = createSlice({
  name: 'chaptersRead', // Tên slice
  initialState,
  reducers: {
    // Reducer để tăng số chapter đã đọc
    incrementChaptersRead(state) {
      state.chaptersRead += 1;  // Tăng số chapters đã đọc lên 1

      // Kiểm tra nếu chaptersRead đạt 10, gọi API
      if (state.chaptersRead >= 10) {
        // Gửi request đến endpoint nào đó
        // Ví dụ gọi một API khi đạt đến 10 chapters (ví dụ sử dụng dispatch để gọi một thunk)
        console.log('Sending data to API...');
        // Nếu có API, bạn có thể dispatch một thunk ở đây để gọi API.
      }
    },
    // Reducer để reset số chapters đã đọc
    resetChaptersRead(state) {
      state.chaptersRead = 0;  // Reset số chapters đã đọc về 0
    },
  },
});

// Export các actions tự động tạo ra từ slice
export const { incrementChaptersRead, resetChaptersRead } = chaptersReadSlice.actions;

// Export reducer để sử dụng trong store
export default chaptersReadSlice.reducer;
