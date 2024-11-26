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

// Thunk para registrar el Goleo

export const registrarGoleoIndividual = createAsyncThunk(
  "admin/registrarGoleoIndividual",
  async (formData) => {
    const body = {
      idPartido: parseInt(formData.idPartido),
      idTorneo: parseInt(formData.idTorneo),
      idEquipo: parseInt(formData.idEquipo),
      idJugador: parseInt(formData.idJugador),
      numeroJugador: parseInt(formData.numeroJugador),
      goles: parseInt(formData.goles),
    };

    const response = await axios.post(
      "https://www.dcoapi.somee.com/api/EnviarDatos/insertarGoleoIndividual_4_0",
      body
    );
    return response.data;
  }
);

// Thunk para registrar el Goleo

export const registrarGoleoTotal = createAsyncThunk(
  "admin/registrarGoleoTotal",
  async (formData) => {
    const body = {
      idPartido: parseInt(formData.idPartido),
      idTorneo: parseInt(formData.idTorneo),
      idEquipo: parseInt(formData.idEquipo),
      golesAnotados: parseInt(formData.golesAnotados),
      golesRecibidos: parseInt(formData.golesRecibidos),
      goles: parseInt(formData.resultado),
    };

    const response = await axios.post(
      "https://www.dcoapi.somee.com/api/EnviarDatos/InsertarGoleoTotal_4_1",
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
      // ##### REGISTRAR CATEGORIA
      .addCase(registrarCategoria.pending, (state) => {
        state.status = "loading"; // Estado de carga
        state.error = null; // Reinicia cualquier error previo
      })
      .addCase(registrarCategoria.fulfilled, (state, action) => {
        state.status = "succeeded"; // Estado exitoso
        // Aquí puedes manejar el éxito de la acción si necesitas guardar datos
      })
      .addCase(registrarCategoria.rejected, (state, action) => {
        state.status = "failed"; // Estado fallido
        state.error = action.error.message || "Error desconocido."; // Captura el mensaje de error
      })

      // ##### REGISTRAR TORNEO
      .addCase(registrarTorneo.pending, (state) => {
        state.status = "loading"; // Estado de carga
        state.error = null; // Reinicia cualquier error previo
      })
      .addCase(registrarTorneo.fulfilled, (state) => {
        state.status = "succeeded"; // Estado exitoso
      })
      .addCase(registrarTorneo.rejected, (state, action) => {
        state.status = "failed"; // Estado fallido
        state.error = action.error.message || "Error desconocido."; // Captura el mensaje de error
      })

      // ##### REGISTRAR EQUIPO
      .addCase(registrarEquipo.pending, (state) => {
        state.status = "loading"; // Estado de carga
        state.error = null; // Reinicia cualquier error previo
      })
      .addCase(registrarEquipo.fulfilled, (state) => {
        state.status = "succeeded"; // Estado exitoso
      })
      .addCase(registrarEquipo.rejected, (state, action) => {
        state.status = "failed"; // Estado fallido
        state.error = action.error.message || "Error desconocido."; // Captura el mensaje de error
      })

      // ##### REGISTRAR JUGADOR
      .addCase(registrarJugador.pending, (state) => {
        state.status = "loading"; // Estado de carga
        state.error = null; // Reinicia cualquier error previo
      })
      .addCase(registrarJugador.fulfilled, (state) => {
        state.status = "succeeded"; // Estado exitoso
      })
      .addCase(registrarJugador.rejected, (state, action) => {
        state.status = "failed"; // Estado fallido
        state.error = action.error.message || "Error desconocido."; // Captura el mensaje de error
      })

      // ##### REGISTRAR relacionar jugador y equipo
      .addCase(relacionarJugadorEquipo.pending, (state) => {
        state.status = "loading"; // Estado de carga
        state.error = null; // Reinicia cualquier error previo
      })
      .addCase(relacionarJugadorEquipo.fulfilled, (state) => {
        state.status = "succeeded"; // Estado exitoso
      })
      .addCase(relacionarJugadorEquipo.rejected, (state, action) => {
        state.status = "failed"; // Estado fallido
        state.error = action.error.message || "Error desconocido."; // Captura el mensaje de error
      })

      // ##### REGISTRAR PARTIDO
      .addCase(registrarPartido.pending, (state) => {
        state.status = "loading"; // Estado de carga
        state.error = null; // Reinicia cualquier error previo
      })
      .addCase(registrarPartido.fulfilled, (state) => {
        state.status = "succeeded"; // Estado exitoso
      })
      .addCase(registrarPartido.rejected, (state, action) => {
        state.status = "failed"; // Estado fallido
        state.error = action.error.message || "Error desconocido."; // Captura el mensaje de error
      })

      .addCase(fetchJuegos.fulfilled, (state, action) => {
        state.juegos = action.payload;
      })

      // ##### REGISTRAR RESULTADO
      .addCase(registrarResultado.pending, (state) => {
        state.status = "loading"; // Estado de carga
        state.error = null; // Reinicia cualquier error previo
      })
      .addCase(registrarResultado.fulfilled, (state) => {
        state.status = "succeeded"; // Estado exitoso
      })
      .addCase(registrarResultado.rejected, (state, action) => {
        state.status = "failed"; // Estado fallido
        state.error = action.error.message || "Error desconocido."; // Captura el mensaje de error
      })

      // ##### REGISTRAR GOLEO INDIVIDUAL
      .addCase(registrarGoleoIndividual.pending, (state) => {
        state.status = "loading"; // Estado de carga
        state.error = null; // Reinicia cualquier error previo
      })
      .addCase(registrarGoleoIndividual.fulfilled, (state) => {
        state.status = "succeeded"; // Estado exitoso
      })
      .addCase(registrarGoleoIndividual.rejected, (state, action) => {
        state.status = "failed"; // Estado fallido
        state.error = action.error.message || "Error desconocido."; // Captura el mensaje de error
      })

      // ##### REGISTRAR GOLEO TOTAL
      .addCase(registrarGoleoTotal.pending, (state) => {
        state.status = "loading"; // Estado de carga
        state.error = null; // Reinicia cualquier error previo
      })
      .addCase(registrarGoleoTotal.fulfilled, (state) => {
        state.status = "succeeded"; // Estado exitoso
      })
      .addCase(registrarGoleoTotal.rejected, (state, action) => {
        state.status = "failed"; // Estado fallido
        state.error = action.error.message || "Error desconocido."; // Captura el mensaje de error
      })
  },
});

export default adminSlice.reducer;
