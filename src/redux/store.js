// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import dataReducer  from './actions/dataSlice';
import videosReducer from './actions/videosSlice';
import authReducer from "./actions/authSlice";
import loginReducer from './actions/loginSlice';
import torneosReducer from './actions/torneosSlice';

export const store = configureStore({
  reducer: {
    data: dataReducer,
    videos: videosReducer,
    auth: authReducer,
    login: loginReducer,
    torneos: torneosReducer,
  },
});
