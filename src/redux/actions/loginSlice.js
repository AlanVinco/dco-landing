import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Acción asíncrona para realizar el login
export const loginUser = createAsyncThunk(
  'login/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      // Aquí usa el proxy /api para evitar problemas de CORS
      const response = await fetch('https://www.dcoapi.somee.com/api/EnviarDatos/ValidaUsuario_1_1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials), // credentials debe ser { alias: '...', contrasenia: '...' }
      });

      if (!response.ok) {
        throw new Error('Login fallido');
      }

      const data = await response.json();

      if (data.length === 0 || data[0].resultado !== "Correcto") {
        throw new Error('Credenciales incorrectas');
      }

      return data[0]; // Retorna el primer objeto de la respuesta
    } catch (error) {
      return rejectWithValue(error.message); // Maneja el error
    }
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    user: null,
    status: 'idle', // idle, loading, succeeded, failed
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user'); // Limpia los datos del usuario en el localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload; // Asigna los datos del usuario en el estado
        localStorage.setItem('user', JSON.stringify(action.payload)); // Guarda los datos del usuario en el localStorage
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
