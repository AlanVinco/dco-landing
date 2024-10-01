// Correcciones.js
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { insertarFotoJugador } from "../redux/actions/correcionesSlice";

const Correcciones = () => {
  const dispatch = useDispatch();
  const [idJugador, setIdJugador] = useState('');
  const [fileData, setFileData] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileExtension, setFileExtension] = useState('');
  
  const { status, error } = useSelector(state => state.correcciones);

  // Convertir archivo a base64
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setFileName(file.name);
    setFileExtension(file.name.split('.').pop());

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFileData(reader.result.split(',')[1]); // Obtiene solo la parte base64
    };
  };

  // Manejar la acción de agregar
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!idJugador || !fileData || !fileName) {
      alert('Por favor, llena todos los campos');
      return;
    }

    const formData = {
      idJugador: parseInt(idJugador),
      archivo: fileData,
      nombreArchivo: fileName,
      extension: `.${fileExtension}`
    };

    dispatch(insertarFotoJugador(formData));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Subir Foto de Jugador</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="idJugador" className="block text-sm font-medium text-gray-700">ID Jugador</label>
          <input 
            type="number" 
            id="idJugador" 
            value={idJugador}
            onChange={(e) => setIdJugador(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="archivo" className="block text-sm font-medium text-gray-700">Seleccionar archivo</label>
          <input 
            type="file" 
            id="archivo"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
            required
          />
        </div>

        <button 
          type="submit"
          className="w-full px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Subiendo...' : 'Agregar'}
        </button>

        {status === 'failed' && (
          <p className="text-red-500 text-sm mt-2">Error: {error}</p>
        )}

        {status === 'succeeded' && (
          <p className="text-green-500 text-sm mt-2">Archivo subido con éxito</p>
        )}
      </form>
    </div>
  );
};

export default Correcciones;
