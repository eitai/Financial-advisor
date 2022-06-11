import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userName: null,
  userEmail: null,
};
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    initialState,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    setActiveUser: (state, action) => {
      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail;
    },
  },
});

export const { login, logout, setActiveUser, setUserLogOutState } =
  userSlice.actions;

// selectors
export const selectUser = (state) => state.user.user;
export const selectUserName = (state) => state.user.userName;
export const selectUserEmail = (state) => state.user.userEmail;
export default userSlice.reducer;
