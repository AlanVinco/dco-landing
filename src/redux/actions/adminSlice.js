import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk para obtener categorías
export const fetchCategorias = createAsyncThunk(
  "admin/fetchCategorias",
  async () => {
    const response = await axios.get(
      "http://www.dcoapi.somee.com/api/ObtenerDatos/MostrarCategorias?idLiga=4"
    );
    return response.data;
  }
);

// Thunk para obtener torneos según la categoría seleccionada
export const fetchTorneos = createAsyncThunk(
  "admin/fetchTorneos",
  async (idCategoria) => {
    const response = await axios.get(
      `https://www.dcoapi.somee.com/api/ObtenerDatos/MostrarTorneos?idCategoria=${idCategoria}`
    );
    return response.data;
  }
);

// Thunk para registrar una categoría
export const registrarCategoria = createAsyncThunk(
  "admin/registrarCategoria",
  async (formData) => {
    const body = {
      categoria: formData.categoria,
      edadMinima: formData.edadMinima,
      edadMaxima: formData.edadMaxima,
      idLiga: 4,
    };
    const response = await axios.post(
      "https://www.dcoapi.somee.com/api/EnviarDatos/InsertarCategoria_2_3",
      body
    );
    return response.data;
  }
);

// Thunk para registrar un torneo
export const registrarTorneo = createAsyncThunk(
  "admin/registrarTorneo",
  async (formData) => {
    const body = {
      nombreTorneo: formData.nombreTorneo,
      idCategoria: formData.idCategoria,
      numeroEquipos: 80,
    };
    const response = await axios.post(
      "https://www.dcoapi.somee.com/api/EnviarDatos/InsertarTorneo_2_0",
      body
    );
    return response.data;
  }
);

// Thunk para registrar un equipo
export const registrarEquipo = createAsyncThunk(
  "admin/registrarEquipo",
  async (formData) => {
    const body = {
      nombre: formData.nombre,
      idTorneo: formData.idTorneo,
    };
    const response = await axios.post(
      "https://www.dcoapi.somee.com/api/EnviarDatos/InsertaEquipo_2_5",
      body
    );
    return response.data;
  }
);

// Thunk para registrar un jugador
export const registrarJugador = createAsyncThunk(
  "admin/registrarJugador",
  async (formData) => {
    const body = {
      nombre: formData.nombre,
      apellidoPaterno: formData.apellidoPaterno,
      apellidoMaterno: formData.apellidoMaterno,
      fechaNacimiento: formData.fechaNacimiento,
      posicion: formData.posicion,
      sexo: formData.sexo,
      idEquipo: formData.idEquipo,
      numeroCamisa: formData.numeroCamisa,
      archivo: formData.archivo,
      nombreArchivo: formData.nombreArchivo,
      extension: formData.extension,
    };
    const response = await axios.post(
      "https://www.dcoapi.somee.com/api/EnviarDatos/InsertaJugador_2_6",
      body
    );
    return response.data;
  }
);

// Thunk para relacionar jugador con equipo
export const relacionarJugadorEquipo = createAsyncThunk(
  "admin/relacionarJugadorEquipo",
  async (formData) => {
    const body = {
      idEquipo: formData.idEquipo,
      idJugador: formData.idJugador,
      numeroCamisa: formData.numeroCamisa,
    };
    const response = await axios.post(
      "https://www.dcoapi.somee.com/api/EnviarDatos/RelacionaJugadorEquipo_3_1",
      body
    );
    return response.data;
  }
);

// Thunk para registrar un partido
export const registrarPartido = createAsyncThunk(
  "admin/registrarPartido",
  async (formData) => {
    const body = {
      idEquipoLocal: formData.idEquipoLocal,
      idEquipoVisita: formData.idEquipoVisita,
      fechaJuego: formData.fechaJuego,
      horaInicioJuego: formData.horaInicioJuego,
      idTorneo: formData.idTorneo,
      jornada: formData.jornada,
    };
    const response = await axios.post(
      "https://www.dcoapi.somee.com/api/EnviarDatos/InsertarPartido_2_1",
      body
    );
    return response.data;
  }
);

// Thunk para obtener juegos según el torneo seleccionado
export const fetchJuegos = createAsyncThunk(
  "admin/fetchJuegos",
  async (idTorneo) => {
    const response = await axios.get(
      `http://www.dcoapi.somee.com/api/ObtenerDatos/ObtineCalendario?idTorneo=${idTorneo}`
    );
    return response.data;
  }
);
// Thunk para registrar el resultado

export const registrarResultado = createAsyncThunk(
  "admin/registrarResultado",
  async (formData) => {
    const body = {
      idPartido: formData.idPartido,
      idTorneo: formData.idTorneo,
      idEquipoLocal: formData.idEquipoLocal,
      idEquipoVisita: formData.idEquipoVisita,
      golesLocal: formData.golesLocal,
      golesVisita: formData.golesVisita,
    };

    const response = await axios.post(
      "https://www.dcoapi.somee.com/api/EnviarDatos/InsertaResultado_2_7",
      body
    );
    return response.data;
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    categorias: [],
    torneos: [],
    status: "idle",
    equipos: [],
    juegos: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Para cargar categorías
      .addCase(fetchCategorias.fulfilled, (state, action) => {
        state.categorias = action.payload;
      })
      // Para cargar torneos
      .addCase(fetchTorneos.fulfilled, (state, action) => {
        state.torneos = action.payload;
      })
      // Para manejar el registro de categoría
      .addCase(registrarCategoria.fulfilled, (state, action) => {
        // Aquí puedes manejar el éxito del registro de categoría
      })
      // Para manejar el registro de torneo
      .addCase(registrarTorneo.fulfilled, (state, action) => {
        // Aquí puedes manejar el éxito del registro de torneo
      })
      // Para manejar el registro de equipo
      .addCase(registrarEquipo.fulfilled, (state, action) => {
        // Aquí puedes manejar el éxito del registro de equipo
      })

      // Para registrar un jugador
      .addCase(registrarJugador.fulfilled, (state, action) => {
        console.log("Jugador registrado", action.payload);
      })
      // Para relacionar jugador y equipo
      .addCase(relacionarJugadorEquipo.fulfilled, (state, action) => {
        console.log("Jugador relacionado con equipo", action.payload);
      })
      .addCase(registrarPartido.fulfilled, (state, action) => {
        console.log("Partido registrado", action.payload);
      })
      .addCase(fetchJuegos.fulfilled, (state, action) => {
        state.juegos = action.payload;
      })
      // Para manejar el registro del resultado del partido
      .addCase(registrarResultado.fulfilled, (state, action) => {
        console.log("Resultado registrado con éxito", action.payload);
      });
  },
});

export default adminSlice.reducer;
