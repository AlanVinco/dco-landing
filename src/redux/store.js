// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import equiposReducer from './actions/equiposSlice';
import videosReducer from './actions/videosSlice';
import authReducer from "./actions/authSlice";
import loginReducer from './actions/loginSlice';

export const store = configureStore({
  reducer: {
    equipos: equiposReducer,
    videos: videosReducer,
    auth: authReducer,
    login: loginReducer,
  },
});
