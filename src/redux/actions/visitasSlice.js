import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchVisitas = createAsyncThunk(
    "admin/fetchVisitas",
    async () => {
      const response = await axios.get(
        "https://www.dcoapi.somee.com/api/ObtenerDatos/MostrarNumeroDeVisitas"
      );
      return response.data;
    }
  );

  const visitasSlice = createSlice({
    name: "admin",
    initialState: {
      visitas: "",
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        // Para cargar categorías
        .addCase(fetchVisitas.fulfilled, (state, action) => {
          state.visitas = action.payload;
        })
    },
  });
  
  export default visitasSlice.reducer;
  
