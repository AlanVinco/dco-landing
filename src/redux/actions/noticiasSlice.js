// thunks.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk para obtener noticias de la liga
export const obtenerNoticiasLiga = createAsyncThunk('noticias/obtenerNoticiasLiga', async () => {
    const response = await axios.get('https://www.dcoapi.somee.com/api/ObtenerDatos/NoticiasLiga?idLiga=4');
    return response.data;
});

const noticiasSlice = createSlice({
    name: 'noticias',
    initialState: {
        noticias: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(obtenerNoticiasLiga.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(obtenerNoticiasLiga.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.noticias = action.payload;
            })
            .addCase(obtenerNoticiasLiga.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default noticiasSlice.reducer;