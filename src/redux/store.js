// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import equiposReducer from './actions/equiposSlice';
import videosReducer from './actions/videosSlice';

export const store = configureStore({
  reducer: {
    equipos: equiposReducer,
    videos: videosReducer,
  },
});
