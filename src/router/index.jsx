import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Torneos from "../pages/Torneos";
import Administracion from "../pages/Administracion";
import Correciones from "../pages/Correciones";
import Equipos from "../pages/Equipos";
import Patrocinadores from "../pages/Patrocinadores";
import Servicios from "../pages/Servicios";
import Videos from "../pages/Videos";
import Inicio from "../pages/Inicio";


import DashboardLayout from "../components/DashboardLayout ";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/dashboard",
        element: <ProtectedRoute element={<DashboardLayout />} />, // Ruta protegida con layout
        children: [
            {
                path: "home",
                element: <Inicio />
            },
            {
                path: "torneos",
                element: <Torneos />, // Se renderiza dentro de DashboardLayout
            },
            {
                path: "administracion",
                element: <Administracion />, // Se renderiza dentro de DashboardLayout
            },
            {
                path: "correciones",
                element: <Correciones />, // Se renderiza dentro de DashboardLayout
            },
            {
                path: "equipos",
                element: <Equipos />, // Se renderiza dentro de DashboardLayout
            },
            {
                path: "patrocinadores",
                element: <Patrocinadores />, // Se renderiza dentro de DashboardLayout
            },
            {
                path: "servicios",
                element: <Servicios />, // Se renderiza dentro de DashboardLayout
            },
            {
                path: "videos",
                element: <Videos />, // Se renderiza dentro de DashboardLayout
            },
        ],
    },

]);
