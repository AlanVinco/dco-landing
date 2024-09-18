import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Definir una acción asíncrona usando createAsyncThunk
export const fetchVideos = createAsyncThunk(
  'videos/fetchVideos',
  async () => {
    // Hacer la solicitud HTTP utilizando la URL proxy
    const response = await fetch('/api/api/ObtenerDatos/ObtenerVideos');
    
    // Verifica si la respuesta es correcta antes de parsear el JSON
    if (!response.ok) {
      throw new Error('Error al obtener los equipos');
    }
    
    // Parsear la respuesta como JSON
    const data = await response.json();
    
    // Retornar los datos que serán gestionados por Redux
    return data;
  }
);

// Crear el slice para gestionar el estado de equipos
const videosSlice = createSlice({
  name: 'videos',
  initialState: {
    data: [], // Estado inicial de los datos de equipos
    status: 'idle', // idle, loading, succeeded, failed
    error: null, // Almacena cualquier error
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.status = 'loading'; // Cambia el estado cuando está cargando
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Indica que se obtuvieron los datos correctamente
        state.data = action.payload; // Almacena los datos obtenidos
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.status = 'failed'; // Indica que hubo un error
        state.error = action.error.message; // Almacena el mensaje de error
      });
  },
});

// Exportar el reducer para configurarlo en el store
export default videosSlice.reducer;
