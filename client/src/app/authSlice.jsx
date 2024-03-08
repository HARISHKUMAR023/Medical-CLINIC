import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  user: {
    email: null,
    token: null,
  },
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest(state) {
      state.isLoading = true;
    },
    loginSuccess(state, action) {
      console.log('loginSuccess action payload:', action.payload);
      state.isLoggedIn = true;
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    
    loginFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = { email: null, token: null }; // Reset user data on logout
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
