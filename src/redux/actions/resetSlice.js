import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit';

// Paso 1: Verificar si el usuario existe
export const checkUserExists = createAsyncThunk(
    'auth/checkUserExists',
    async (alias, { rejectWithValue }) => {
      try {
        const response = await fetch('https://www.dcoapi.somee.com/api/EnviarDatos/RestablecerContrasenia_1_4', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ alias }),
        });
        const data = await response.json();
        if (data[0].resultado === 'No existe el usuario') {
          return rejectWithValue(data[0].resultado);
        }
        return data[0].resultado;
      } catch (error) {
        return rejectWithValue('Error en la solicitud');
      }
    }
  );
  
  // Paso 2: Establecer una nueva contraseña
  export const setNewPassword = createAsyncThunk(
    'auth/setNewPassword',
    async ({ alias, contrasenia }, { rejectWithValue }) => {
      try {
        const response = await fetch('https://www.dcoapi.somee.com/api/EnviarDatos/EstablecerContrasenia_1_0', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ alias, contrasenia }),
        });
        const data = await response.json();
        if (data[0].resultado === 'El usuario no existe') {
          return rejectWithValue(data[0].resultado);
        }
        return data[0].resultado;
      } catch (error) {
        return rejectWithValue('Error en la solicitud');
      }
    }
  );

  const resetSlice = createSlice({
    name: 'auth',
    initialState: {
      status: 'idle',
      error: null,
      success: null,
    },
    reducers: {
      clearState: (state) => {
        state.status = 'idle';
        state.error = null;
        state.success = null;
      },
    },
    extraReducers: (builder) => {
      builder
        // Paso 1: Verificar usuario
        .addCase(checkUserExists.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(checkUserExists.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.success = action.payload;
        })
        .addCase(checkUserExists.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        })
        // Paso 2: Establecer nueva contraseña
        .addCase(setNewPassword.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(setNewPassword.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.success = action.payload;
        })
        .addCase(setNewPassword.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        });
    },
  });
  
  export const { clearState } = resetSlice.actions;
  export default resetSlice.reducer;