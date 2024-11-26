// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import dataReducer  from './actions/dataSlice';
import videosReducer from './actions/videosSlice';
import authReducer from "./actions/authSlice";
import loginReducer from './actions/loginSlice';
import torneosReducer from './actions/torneosSlice';
import adminReducer  from './actions/adminSlice';
import modalReducer from "./actions/modalSlice";
import correcionesReducer from "./actions/correcionesSlice";
import noticiasReducer from "./actions/noticiasSlice";
import visitasReducer  from './actions/visitasSlice';
import resetReducer from './actions/resetSlice';

export const store = configureStore({
  reducer: {
    data: dataReducer,
    videos: videosReducer,
    auth: authReducer,
    login: loginReducer,
    torneos: torneosReducer,
    admin: adminReducer,
    modal: modalReducer,
    correcciones:correcionesReducer,
    noticias: noticiasReducer,
    visitas: visitasReducer,
    reset: resetReducer,
  },
});
