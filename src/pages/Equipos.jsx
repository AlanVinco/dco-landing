import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategorias,
  fetchEquipos,
  fetchJugadores,
  fetchJugadorDetalle,
} from "../redux/actions/dataSlice";
import QRCode from "react-qr-code";

function Equipos() {
  const dispatch = useDispatch();
  const { categorias, equipos, jugadores, jugadorDetalle, fotoJugador } =
    useSelector((state) => state.data);

  const [selectedCategoria, setSelectedCategoria] = useState(null);
  const [selectedEquipo, setSelectedEquipo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null); // Referencia para el modal

  useEffect(() => {
    dispatch(fetchCategorias());
    dispatch(fetchEquipos());
  }, [dispatch]);

  const handleCategoriaChange = (e) => {
    const idCategoria = e.target.value;
    setSelectedCategoria(idCategoria);
    setSelectedEquipo("");
  };

  const handleEquipoChange = (e) => {
    const idEquipo = e.target.value;
    setSelectedEquipo(idEquipo);
    dispatch(fetchJugadores(idEquipo));
  };

  const handleJugadorClick = (idJugador) => {
    dispatch(fetchJugadorDetalle(idJugador));
    setShowModal(true);

    // Mover el scroll hacia el modal
    setTimeout(() => {
      if (modalRef.current) {
        modalRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="mx-auto p-6 glass my-5 shadow-xl rounded-box animate__animated animate__bounce animate__tada">
      {/* Selector de Categorías */}
      <div className="mb-6">
        <label className="block text-lg mb-2 text-white">Categorías</label>
        <select
          onChange={handleCategoriaChange}
          className="select select-error w-full text-lg shadow-xl"
        >
          <option value="" selected disabled>
            Selecciona una categoría
          </option>
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
        <select
          onChange={handleEquipoChange}
          className="select select-error w-full text-lg shadow-xl"
          disabled={!selectedCategoria}
          value={selectedEquipo}
        >
          <option disabled selected value="">
            Selecciona un equipo
          </option>
          {equipos
            .filter(
              (equipo) => equipo.idCategoria === parseInt(selectedCategoria)
            )
            .map((equipo, index) => (
              <option key={index} value={equipo.idEquipo}>
                {equipo.nombre}
              </option>
            ))}
        </select>
      </div>

      {/* Tabla de Jugadores */}
      {jugadores.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table text-white text-xl">
            <thead>
              <tr className="text-white text-xl">
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
                      className="btn bg-[#1A1A2E] text-white hover:bg-[#8B0000] glass"
                    >
                      Ver Detalle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {selectedCategoria && selectedEquipo && jugadores.length === 0 && <div className="text-white">No se encontraron registros.</div>}

      {/* Modal */}
      {showModal && (
        <div ref={modalRef} className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-[#8B0000]/90 p-6 rounded-lg max-w-lg text-white w-96 shadow-xl">
            <button
              onClick={closeModal}
              className="text-white hover:text-gray-700 mb-4 float-right"
            >
              <svg
                className="swap-on fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
              </svg>
            </button>

            {/* Detalle del Jugador */}
            {jugadorDetalle && (
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-4">Detalle del Jugador</h3>
                <p>
                  <strong>Equipo:</strong> {jugadorDetalle.equipo}
                </p>
                <p>
                  <strong>Nombre:</strong> {jugadorDetalle.jugador}
                </p>
                <p>
                  <strong>Playera:</strong> {jugadorDetalle.playera}
                </p>

                {/* Imagen del Jugador */}
                {fotoJugador && (
                  <div className="mt-4">
                    <h4 className="text-lg font-bold mb-2">Foto del Jugador</h4>
                    <img
                      src={`data:image/${fotoJugador.extensionArchivo};base64,${fotoJugador.archivo}`}
                      alt={fotoJugador.nombreArchivo}
                      className="object-cover"
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
