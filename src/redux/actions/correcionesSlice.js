// correccionesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk para insertar la foto del jugador
export const insertarFotoJugador = createAsyncThunk('correcciones/insertarFotoJugador', async (formData) => {
    const body = {
        idJugador: formData.idJugador,
        archivo: formData.archivo,
        nombreArchivo: formData.nombreArchivo,
        extension: formData.extension,
    };

    const response = await axios.post('https://www.dcoapi.somee.com/api/EnviarDatos/InsertarFotoJugador_2_6_1', body);
    return response.data;
});

const correccionesSlice = createSlice({
    name: 'correcciones',
    initialState: {
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(insertarFotoJugador.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(insertarFotoJugador.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(insertarFotoJugador.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default correccionesSlice.reducer;
