import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import axiosInstance from '@/api/axiosConfig';

export const introspect = createAsyncThunk("auth/introspect", async (_, thunkAPI) => {
  const token = Cookies.get("reading_web_jwt");
  if (!token) {
    return thunkAPI.rejectWithValue("No token found");
  }

  try {
    // check token endpoint
    const response = await axiosInstance.post("/api/auth/introspect",
      { accessToken: token }
    );

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
  },
  reducers: {
    login: (state, action) => {
      const { accessToken, refreshToken } = action.payload;
    
      Cookies.set("reading_web_jwt", accessToken, { expires: 1 / 24 });
      Cookies.set("reading_web_refreshToken", refreshToken, { expires: 1 });

      state.isAuthenticated = true;

    },
    // Action logout: xóa state và cookie
    logout: (state) => {
      Cookies.remove("reading_web_jwt");
      Cookies.remove("reading_web_refreshToken");

      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(introspect.fulfilled, (state) => {
        state.isAuthenticated = true;
      })
      .addCase(introspect.rejected, (state) => {
        state.isAuthenticated = false;
      });
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
