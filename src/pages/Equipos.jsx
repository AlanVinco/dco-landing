import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategorias, fetchEquipos, fetchJugadores, fetchJugadorDetalle } from "../redux/actions/dataSlice";
import QRCode from 'react-qr-code';

function Equipos() {
  const dispatch = useDispatch();
  const { categorias, equipos, jugadores, jugadorDetalle, fotoJugador } = useSelector((state) => state.data);
  
  const [selectedCategoria, setSelectedCategoria] = useState(null);
  const [selectedEquipo, setSelectedEquipo] = useState(null);
  const [showModal, setShowModal] = useState(false); // Estado para controlar el modal

  useEffect(() => {
    dispatch(fetchCategorias());
    dispatch(fetchEquipos());
  }, [dispatch]);

  const handleCategoriaChange = (e) => {
    const idCategoria = e.target.value;
    setSelectedCategoria(idCategoria);
  };

  const handleEquipoChange = (e) => {
    const idEquipo = e.target.value;
    setSelectedEquipo(idEquipo);
    dispatch(fetchJugadores(idEquipo));
  };

  const handleJugadorClick = (idJugador) => {
    dispatch(fetchJugadorDetalle(idJugador));
    setShowModal(true); // Mostrar el modal cuando se hace clic en "Ver Detalle"
  };

  const closeModal = () => {
    setShowModal(false); // Cerrar el modal
  };

  return (
    <div className="container mx-auto p-6">
      {/* Selector de Categorías */}
      <div className="mb-6">
        <label className="block text-lg mb-2 text-white">Categorías</label>
        <select onChange={handleCategoriaChange} className="p-2 border rounded w-full">
          <option value="">Selecciona una categoría</option>
          {categorias.map((categoria, index) => (
            <option key={index} value={categoria.idCategoria}>
              {categoria.categoria}
            </option>
          ))}
        </select>
      </div>

      {/* Selector de Equipos */}
      <div className="mb-6">
        <label className="block text-lg mb-2 text-white">Equipos</label>
        <select onChange={handleEquipoChange} className="p-2 border rounded w-full" disabled={!selectedCategoria}>
          <option value="">Selecciona un equipo</option>
          {equipos
            .filter((equipo) => equipo.idCategoria === parseInt(selectedCategoria))
            .map((equipo, index) => (
              <option key={index} value={equipo.idEquipo}>
                {equipo.nombre}
              </option>
            ))}
        </select>
      </div>

      {/* Tabla de Jugadores */}
      {jugadores.length > 0 && (
        <table className="table-auto w-full mb-6 text-white">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Playera</th>
              <th>Edad</th>
              <th>Fecha de Nacimiento</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {jugadores.map((jugador, index) => (
              <tr key={index}>
                <td>{jugador.nombreJugador}</td>
                <td>{jugador.playera}</td>
                <td>{jugador.edad}</td>
                <td>{jugador.fechaNacimiento}</td>
                <td>
                  <button 
                    onClick={() => handleJugadorClick(jugador.identificador)} 
                    className="bg-blue-500 text-white p-2 rounded"
                  >
                    Ver Detalle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-3/4 max-w-lg">
            <button 
              onClick={closeModal} 
              className="text-gray-500 hover:text-gray-700 mb-4 float-right"
            >
              Cerrar
            </button>
            
            {/* Detalle del Jugador */}
            {jugadorDetalle && (
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-4">Detalle del Jugador</h3>
                <p><strong>Equipo:</strong> {jugadorDetalle.equipo}</p>
                <p><strong>Nombre:</strong> {jugadorDetalle.jugador}</p>
                <p><strong>Playera:</strong> {jugadorDetalle.playera}</p>

                {/* Imagen del Jugador */}
                {fotoJugador && (
                  <div className="mt-4">
                    <h4 className="text-lg font-bold mb-2">Foto del Jugador</h4>
                    <img 
                      src={`data:image/${fotoJugador.extensionArchivo};base64,${fotoJugador.archivo}`} 
                      alt={fotoJugador.nombreArchivo} 
                      className="w-32 h-32 object-cover" 
                    />
                  </div>
                )}
              </div>
            )}

            {/* Registro QR */}
            {jugadorDetalle && (
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-4">Registro QR</h3>
                <QRCode value={jugadorDetalle.identificador.toString()} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Equipos;
