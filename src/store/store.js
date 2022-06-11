import { configureStore } from '@reduxjs/toolkit';
import useReducer from '../store/userSlice';

export default configureStore({
  reducer: {
    user: useReducer,
  },
});
