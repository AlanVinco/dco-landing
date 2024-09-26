import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks para las APIs
export const fetchCategorias = createAsyncThunk('torneos/fetchCategorias', async () => {
  const response = await axios.get('https://www.dcoapi.somee.com/api/ObtenerDatos/MostrarCategorias?idLiga=4');
  return response.data;
});

export const fetchEquipos = createAsyncThunk('torneos/fetchEquipos', async (idCategoria) => {
  const response = await axios.get(`https://www.dcoapi.somee.com/api/ObtenerDatos/MostrarCategoriasEquipos?idCategoria=${idCategoria}`);
  return response.data;
});

export const fetchTorneos = createAsyncThunk('torneos/fetchTorneos', async (idCategoria) => {
  const response = await axios.get(`https://www.dcoapi.somee.com/api/ObtenerDatos/MostrarTorneos?idCategoria=${idCategoria}`);
  return response.data;
});

// export const fetchCalendario = createAsyncThunk('torneos/fetchCalendario', async (idTorneo) => {
//   const response = await axios.get(`https://www.dcoapi.somee.com/api/ObtenerDatos/ObtineCalendario?idTorneo=${idTorneo}`);
//   return response.data;
// });

//selectores
export const fetchTablaGeneralVacia = createAsyncThunk(
  'torneos/fetchTablaGeneralVacia',
  async ({ selectedCategoria, selectedTorneo }) => {
    const response = await axios.get(`https://www.dcoapi.somee.com/api/ObtenerDatos/MostrarTablaGeneralVacia?idCategoria=${selectedCategoria}&idTorneo=${selectedTorneo}`);
    return response.data;
  }
);

export const fetchTablaGeneral = createAsyncThunk(
  'torneos/fetchTablaGeneral',
  async ({ selectedCategoria, selectedTorneo }) => {
    const response = await axios.get(`https://www.dcoapi.somee.com/api/ObtenerDatos/MostrarTablaGeneral?idCategoria=${selectedCategoria}&idTorneo=${selectedTorneo}`);
    return response.data;
  }
);

export const fetchTablaGoleoIndividual = createAsyncThunk(
  'torneos/fetchTablaGoleoIndividual',
  async (selectedTorneo) => {
    const response = await axios.get(`https://www.dcoapi.somee.com/api/ObtenerDatos/TablaDeGoleoIndividual?idTorneo=${selectedTorneo}`);
    return response.data;
  }
);

export const fetchCalendarioGoleo = createAsyncThunk(
  'torneos/fetchCalendarioGoleo',
  async (selectedTorneo) => {
    const response = await axios.get(`https://www.dcoapi.somee.com/api/ObtenerDatos/ObtineCalendarioGoleo?idTorneo=${selectedTorneo}`);
    return response.data;
  }
);

export const fetchCalendario = createAsyncThunk(
  'torneos/fetchCalendario',
  async (selectedTorneo) => {
    const response = await axios.get(`https://www.dcoapi.somee.com/api/ObtenerDatos/ObtineCalendario?idTorneo=${selectedTorneo}`);
    return response.data;
  }
);

const torneosSlice = createSlice({
  name: 'torneos',
  initialState: {
    categorias: [],
    equipos: [],
    torneos: [],
    calendario: [],
    loading: false,
    selectedCategoria: null,
    selectedTorneo: null,

    status: null,
    partidos: [],
    tablaGeneral: [],
    tablaGeneralVacia: [],
    tablaGoleoIndividual: [],
    calendarioGoleo: [],
  },
  reducers: {
    setSelectedCategoria: (state, action) => {
      state.selectedCategoria = action.payload;
    },
    setSelectedTorneo: (state, action) => {
      state.selectedTorneo = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Categorias
      .addCase(fetchCategorias.pending, (state) => {
        state.loading = true;
        state.status = 'success';
      })
      .addCase(fetchCategorias.fulfilled, (state, action) => {
        state.loading = false;
        state.categorias = action.payload;
        state.status = 'success';
      })
      .addCase(fetchCategorias.rejected, (state) => {
        state.loading = false;
        state.status = 'success';
      })

      // Equipos
      .addCase(fetchEquipos.fulfilled, (state, action) => {
        state.equipos = action.payload;
        state.status = 'success';
      })

      // Torneos
      .addCase(fetchTorneos.fulfilled, (state, action) => {
        state.torneos = action.payload;
        state.status = 'success';
      })

      // Calendario
      // .addCase(fetchCalendario.fulfilled, (state, action) => {
      //   state.calendario = action.payload;
      // })
      // selector
      // Tabla General Vacia
      .addCase(fetchTablaGeneralVacia.fulfilled, (state, action) => {
        state.tablaGeneralVacia = action.payload;
        state.status = 'success';
      })
      // Tabla General
      .addCase(fetchTablaGeneral.fulfilled, (state, action) => {
        state.tablaGeneral = action.payload;
        state.status = 'success';
      })
      // Tabla de Goleo Individual
      .addCase(fetchTablaGoleoIndividual.fulfilled, (state, action) => {
        state.tablaGoleoIndividual = action.payload;
        state.status = 'success';
      })
      // Calendario de Goleo
      .addCase(fetchCalendarioGoleo.fulfilled, (state, action) => {
        state.calendarioGoleo = action.payload;
        state.status = 'success';
      })
      // Calendario
      .addCase(fetchCalendario.fulfilled, (state, action) => {
        state.calendario = action.payload;
        state.status = 'success';
      });
  },
});

export const { setSelectedCategoria, setSelectedTorneo, } = torneosSlice.actions;
export default torneosSlice.reducer;
