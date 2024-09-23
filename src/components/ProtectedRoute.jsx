import { Navigate } from "react-router-dom";

// Simula si el usuario está autenticado
const isAuthenticated = () => {
    // Aquí puedes poner la lógica real de autenticación,
    // como verificar un token en el localStorage o en un contexto.
    return localStorage.getItem("user") !== null;
};

const ProtectedRoute = ({ element }) => {
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    return element;
};

export default ProtectedRoute;
