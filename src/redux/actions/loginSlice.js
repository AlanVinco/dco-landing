import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Función para obtener la IP del usuario
const fetchUserIP = async () => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Error fetching IP:', error);
    return null;
  }
};

// Acción asíncrona para realizar el login
export const loginUser = createAsyncThunk(
  'login/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      // Realiza el POST para el login
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

      // Obtener la IP del usuario
      const userIP = await fetchUserIP();

      // Realizar el segundo POST para registrar la conexión
      const registerResponse = await fetch('https://www.dcoapi.somee.com/api/EnviarDatos/RegistraConexion_1_2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idTipoUsuario: data[0].idTipoUsuario,
          idUsuario: 17,
          alias: "Invitado",
          ip: userIP || '38.49.137.173',
          nombreDispositivo: 'pruebaAPI', // Puedes ajustar esto según sea necesario
        }),
      });

      if (!registerResponse.ok) {
        throw new Error('Error registrando conexión');
      }

      // Devuelve los datos del login
      return data[0]; 
    } catch (error) {
      return rejectWithValue(error.message); // Maneja el error
    }
  }
);

// Función para registrar la conexión de un usuario no logeado (invitado)
export const registerGuestConnection = async () => {
  try {
    // Obtener la IP del usuario
    const userIP = await fetchUserIP();

    // Realizar el POST para registrar la conexión como invitado
    const registerResponse = await fetch('https://www.dcoapi.somee.com/api/EnviarDatos/RegistraConexion_1_2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idTipoUsuario: 1001,
        idUsuario: 17,
        alias: "Invitado",
        ip: userIP || '38.49.137.173', // Usa la IP obtenida o un mensaje por defecto si falla
        nombreDispositivo: "pruebaAPI",
      }),
    });

    if (!registerResponse.ok) {
      throw new Error('Error registrando conexión para invitado');
    }

    const data = await registerResponse.json();
    console.log('Conexión registrada para invitado:', data);
    return data; // Retorna la respuesta si es necesario
  } catch (error) {
    console.error('Error en registerGuestConnection:', error);
    return null;
  }
};

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
