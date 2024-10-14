import { useState } from "react";
import { useDispatch } from "react-redux";
import ModalLoad from "../components/ModalLoad";
import { setModalContent } from "../redux/actions/modalSlice";// Importamos la acción del slice

const options = [
  "Registrar Categoría",
  "Registrar Torneo",
  "Registrar Equipo",
  "Registrar Jugador",
  "Ingresar Partido",
  "Registrar Resultado",
  "Registrar Goleo Individual",
];

const AdminSelector = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const dispatch = useDispatch();

  const handleOptionChange = (event) => {
    const option = event.target.value;
    setSelectedOption(option);
    // Dispatch para mostrar el modal con la categoría seleccionada
    dispatch(setModalContent(option));
  };

  return (
    <div className="admin-selector">
      <select value={selectedOption} onChange={handleOptionChange}>
        <option value="" disabled>
          Selecciona una opción
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {/* Modal */}
      <ModalLoad selectedOption={selectedOption} />
    </div>
  );
};

export default AdminSelector;
