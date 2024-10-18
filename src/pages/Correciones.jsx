// Correcciones.js
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { insertarFotoJugador } from "../redux/actions/correcionesSlice";

const Correcciones = () => {
  const dispatch = useDispatch();
  const [idJugador, setIdJugador] = useState("");
  const [fileData, setFileData] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileExtension, setFileExtension] = useState("");

  const { status, error } = useSelector((state) => state.correcciones);

  // Convertir archivo a base64
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setFileName(file.name);
    setFileExtension(file.name.split(".").pop());

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFileData(reader.result.split(",")[1]); // Obtiene solo la parte base64
    };
  };

  // Manejar la acción de agregar
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!idJugador || !fileData || !fileName) {
      alert("Por favor, llena todos los campos");
      return;
    }

    const formData = {
      idJugador: parseInt(idJugador),
      archivo: fileData,
      nombreArchivo: fileName,
      extension: `.${fileExtension}`,
    };

    dispatch(insertarFotoJugador(formData));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-lg rounded-md glass animate__animated animate__rubberBand">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">
        Subir Foto de Jugador
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              required
              type="number"
              id="idJugador"
              value={idJugador}
              onChange={(e) => setIdJugador(e.target.value)}
              className="grow"
              placeholder="ID Jugador"
            />
          </label>
        </div>
        <div>
          <input
            id="archivo"
            accept="image/*"
            required
            onChange={handleFileChange}
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 btn bg-[#1A1A2E] text-white hover:bg-[#8B0000] glass"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Subiendo..." : "Agregar"}
        </button>

        {status === "failed" && (
          <p className="text-red-500 text-sm mt-2">Error: {error}</p>
        )}

        {status === "succeeded" && (
          <p className="text-green-500 text-sm mt-2">
            Archivo subido con éxito
          </p>
        )}
      </form>
    </div>
  );
};

export default Correcciones;
