import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Acción asíncrona para obtener los videos
export const fetchVideos = createAsyncThunk(
  'videos/fetchVideos',
  async () => {
    const response = await fetch('https://www.dcoapi.somee.com/api/ObtenerDatos/ObtenerVideos');
    if (!response.ok) {
      throw new Error('Error al obtener los videos');
    }
    const data = await response.json();
    return data;
  }
);

// Acción asíncrona para insertar un nuevo video
export const insertVideo = createAsyncThunk(
  'videos/insertVideo',
  async (newVideo, { rejectWithValue }) => {
    try {
      const response = await fetch('https://www.dcoapi.somee.com/api/EnviarDatos/InsertaVideo_5_', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newVideo), // Enviar el nuevo video como JSON
      });

      if (!response.ok) {
        throw new Error('Error al insertar el video');
      }

      const data = await response.json();
      return data; // Retorna la respuesta de la API
    } catch (error) {
      return rejectWithValue(error.message); // Maneja el error
    }
  }
);

// Slice para gestionar el estado de los videos
const videosSlice = createSlice({
  name: 'videos',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(insertVideo.fulfilled, (state, action) => {
        state.data.push(action.payload); // Agrega el nuevo video a la lista
      });
  },
});

export default videosSlice.reducer;
