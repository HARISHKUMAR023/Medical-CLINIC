import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  user: {
    name:null,
    email: null,
    token: null,
    usertype:null,
    permissions: [],
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
      state.user = {
        name:action.payload.name,
        email: action.payload.email,
        token: action.payload.token,
        usertype: action.payload.usertype,
        permissions: action.payload.permissions, // Assuming permissions are directly within action.payload
      };
      state.isLoading = false;
      state.error = null;
    },
    
    loginFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = { name:null,email: null, token: null, usertype:null, permissions: []}; // Reset user data on logout
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
