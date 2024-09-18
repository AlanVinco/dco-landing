// src/App.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEquipos } from "../redux/actions/equiposSlice";

function Equipos() {
  const dispatch = useDispatch();
  const { data: equipos, status, error } = useSelector((state) => state.equipos);

  // Estados para almacenar la categoría, el nombre y los torneos seleccionados
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [nombreSeleccionado, setNombreSeleccionado] = useState('');
  const [torneosSeleccionados, setTorneosSeleccionados] = useState('');

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEquipos()); // Despachar la acción para obtener los equipos
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <div className="text-center">Cargando...</div>;
  }

  if (status === "failed") {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  // Filtrar los equipos según la categoría, nombre y torneos seleccionados
  const equiposFiltrados = equipos.filter((equipo) => {
    const filtrarPorCategoria = categoriaSeleccionada
      ? equipo.idCategoria === parseInt(categoriaSeleccionada, 10)
      : true;
    const filtrarPorNombre = nombreSeleccionado
      ? equipo.nombre === nombreSeleccionado
      : true;
    const filtrarPorTorneos = torneosSeleccionados
      ? equipo.numeroTorneos === parseInt(torneosSeleccionados, 10)
      : true;

    return filtrarPorCategoria && filtrarPorNombre && filtrarPorTorneos;
  });

  // Obtener las categorías, nombres y torneos únicos para los selectores
  const categoriasUnicas = [...new Set(equipos.map((equipo) => equipo.idCategoria))];
  const nombresUnicos = [...new Set(equipos.map((equipo) => equipo.nombre))];
  const torneosUnicos = [...new Set(equipos.map((equipo) => equipo.numeroTorneos))];

  return (
    <div>
      <div className="flex justify-center my-4 space-x-4">
        {/* Selector de categoría */}
        <div>
          <label className="mr-2 text-white">Filtrar por Categoría:</label>
          <select
            value={categoriaSeleccionada}
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
            className="px-4 py-2 rounded"
          >
            <option value="">Todas</option>
            {categoriasUnicas.map((categoria) => (
              <option key={categoria} value={categoria}>
                Categoría {categoria}
              </option>
            ))}
          </select>
        </div>

        {/* Selector de nombre */}
        <div>
          <label className="mr-2 text-white">Filtrar por Nombre:</label>
          <select
            value={nombreSeleccionado}
            onChange={(e) => setNombreSeleccionado(e.target.value)}
            className="px-4 py-2 rounded"
          >
            <option value="">Todos</option>
            {nombresUnicos.map((nombre) => (
              <option key={nombre} value={nombre}>
                {nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Selector de torneos */}
        <div>
          <label className="mr-2 text-white">Filtrar por Torneos:</label>
          <select
            value={torneosSeleccionados}
            onChange={(e) => setTorneosSeleccionados(e.target.value)}
            className="px-4 py-2 rounded"
          >
            <option value="">Todos</option>
            {torneosUnicos.map((torneos) => (
              <option key={torneos} value={torneos}>
                {torneos} Torneos
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="hero-content flex-col lg:flex-row card glass">
        <div className="text-white">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr className="text-[#06938D] font-bold text-base">
                  <th></th>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Torneos</th>
                </tr>
              </thead>
              <tbody>
                {equiposFiltrados.map((equipo, index) => (
                  <tr key={index} className="p-2 border-b last:border-none">
                    <th>{index + 1}</th>
                    <th>{equipo.nombre}</th>
                    <th>{equipo.idCategoria}</th>
                    <th>{equipo.numeroTorneos}</th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Equipos;
