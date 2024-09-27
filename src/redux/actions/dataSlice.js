import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCategorias = createAsyncThunk('data/fetchCategorias', async () => {
  const response = await axios.get('https://www.dcoapi.somee.com/api/ObtenerDatos/MostrarCategorias?idLiga=4');
  return response.data;
});

export const fetchEquipos = createAsyncThunk('data/fetchEquipos', async () => {
  const response = await axios.get('https://www.dcoapi.somee.com/api/ObtenerDatos/ObtenerEquipos');
  return response.data;
});

export const fetchJugadores = createAsyncThunk('data/fetchJugadores', async (idEquipo) => {
  const response = await axios.get(`https://www.dcoapi.somee.com/api/ObtenerDatos/MuestraJugadores?idEquipo=${idEquipo}`);
  return response.data;
});

export const fetchJugadorDetalle = createAsyncThunk('data/fetchJugadorDetalle', async (idJugador) => {
  const [detalles, foto] = await Promise.all([
    axios.get(`https://www.dcoapi.somee.com/api/ObtenerDatos/DatosJugadorRegistro?idJugador=${idJugador}`),
    axios.get(`https://www.dcoapi.somee.com/api/ObtenerDatos/MostarFotoJugador?idJugador=${idJugador}`)
  ]);
  return { detalles: detalles.data[0], foto: foto.data[0] };
});

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    categorias: [],
    equipos: [],
    jugadores: [],
    jugadorDetalle: null,
    fotoJugador: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategorias.fulfilled, (state, action) => {
        state.categorias = action.payload;
      })
      .addCase(fetchEquipos.fulfilled, (state, action) => {
        state.equipos = action.payload;
      })
      .addCase(fetchJugadores.fulfilled, (state, action) => {
        state.jugadores = action.payload;
      })
      .addCase(fetchJugadorDetalle.fulfilled, (state, action) => {
        state.jugadorDetalle = action.payload.detalles;
        state.fotoJugador = action.payload.foto;
      });
  }
});

export default dataSlice.reducer;
