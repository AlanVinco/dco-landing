import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategorias,
  fetchEquipos,
  fetchTorneos,
  fetchCalendario,
  setSelectedCategoria,
  setSelectedTorneo,
  fetchTablaGeneralVacia,
  fetchTablaGeneral,
  fetchTablaGoleoIndividual,
  fetchCalendarioGoleo,
} from "../redux/actions/torneosSlice";

const Torneos = () => {
  const dispatch = useDispatch();
  const {
    categorias,
    equipos,
    torneos,
    calendario,
    selectedCategoria,
    selectedTorneo,
    loading,
    tablaGeneral,
    tablaGeneralVacia,
    tablaGoleoIndividual,
    calendarioGoleo,
  } = useSelector((state) => state.torneos);

  const [option, setOption] = useState("");

  useEffect(() => {
    dispatch(fetchCategorias());
  }, [dispatch]);

  const handleCategoriaChange = (e) => {
    const idCategoria = e.target.value;
    dispatch(setSelectedCategoria(idCategoria));
    dispatch(fetchEquipos(idCategoria));
    dispatch(fetchTorneos(idCategoria));
    dispatch(setSelectedTorneo(""));
    setOption("");
  };

  const handleTorneoChange = (e) => {
    const idTorneo = e.target.value;
    dispatch(setSelectedTorneo(idTorneo));
    dispatch(fetchCalendario(idTorneo));
    setOption("");
  };

  const handleOptionChange = (e) => {
    setOption(e.target.value);

    // Aseguramos que idCategoria y idTorneo tengan valores
    if (selectedCategoria && selectedTorneo) {
      switch (e.target.value) {
        case "Tabla General Vacía":
          dispatch(
            fetchTablaGeneralVacia({ selectedCategoria, selectedTorneo })
          );
          break;
        case "Tabla General":
          dispatch(fetchTablaGeneral({ selectedCategoria, selectedTorneo }));
          break;
        case "Tabla de Goleo Individual":
          dispatch(fetchTablaGoleoIndividual(selectedTorneo));
          break;
        case "Calendario de Goleos":
          dispatch(fetchCalendarioGoleo(selectedTorneo));
          break;
        case "Calendario":
          dispatch(fetchCalendario(selectedTorneo));
          break;
        default:
          break;
      }
    }
  };
  return (
    <div className="animate__animated animate__backInUp">
      {loading && <p>Cargando...</p>}
      <div className="card glass mt-5">
        <div className="card-body">
          <h2 className="card-title text-white text-2xl">Torneos</h2>
          <div>
            <label className="block mb-2 font-bold text-white text-xl">
              Categorías
            </label>
            <select
              className="select select-error w-full focus:ring-indigo-500 text-lg shadow-xl"
              onChange={handleCategoriaChange}
              value={selectedCategoria || ""}
            >
              <option disabled selected value="">
                Seleccione una categoría
              </option>
              {categorias.map((categoria) => (
                <option
                  key={categoria.idCategoria}
                  value={categoria.idCategoria}
                >
                  {categoria.categoria}
                </option>
              ))}
            </select>
            <div className="">
              {torneos.length > 0 && (
                <div className="mb-4 ">
                  <label className="block mb-2 font-bold text-white text-xl">
                    Torneos
                  </label>
                  <select
                    className="select select-error w-full text-lg shadow-xl"
                    onChange={handleTorneoChange}
                    value={selectedTorneo || ""}
                  >
                    <option disabled selected value="">
                      Seleccione un torneo
                    </option>
                    {torneos.map((torneo) => (
                      <option key={torneo.idTorneo} value={torneo.idTorneo}>
                        {torneo.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {/* selector */}
              {selectedTorneo && (
                <div>
                  {" "}
                  <div className="">
                    <div className="">
                      <label className="block mb-2 font-bold text-white text-xl">
                        Selecciona una opción
                      </label>
                      <select
                        className="select select-error w-full text-lg shadow-xl"
                        onChange={handleOptionChange}
                        value={option}
                      >
                        <option disabled selected value="">
                          Seleccionar
                        </option>
                        <option value="Tabla General">Tabla General</option>
                        <option value="Calendario de Goleos">Resultados</option>
                        <option value="Calendario">Calendario</option>
                        <option value="Tabla de Goleo Individual">
                          Tabla de Goleo
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {option != "" && (
        <div className="card glass my-5">
          <div className="card-body">
            <div className="text-white">
              {/* Conditionally render tables based on selected option */}
              {option === "Tabla General" && tablaGeneral.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="table text-xl">
                    <thead>
                      <tr className="text-white text-xl">
                        <th>Equipo</th>
                        <th>Puntos</th>
                        <th>JJ</th>
                        <th>JG</th>
                        <th>JE</th>
                        <th>GF</th>
                        <th>GC</th>
                        <th>GD</th>
                        {/* Other table headers */}
                      </tr>
                    </thead>
                    <tbody>
                      {tablaGeneral.map((row, index) => (
                        <tr key={index}>
                          <td>{row.equipo}</td>
                          <td>{row.puntos}</td>
                          <td>{row.jj}</td>
                          <td>{row.jg}</td>
                          <td>{row.je}</td>
                          <td>{row.gf}</td>
                          <td>{row.gc}</td>
                          <td>{row.gd}</td>
                          {/* Other table data */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {option === "Tabla General" && tablaGeneral.length === 0 && (
                <div>No se encontraron resultados.</div>
              )}

              {/* Render for Tabla de Goleo Individual */}
              {option === "Tabla de Goleo Individual" &&
                tablaGoleoIndividual.length > 0 && (
                  <div className="overflow-x-auto">
                    <table className="table text-xl">
                      <thead>
                        <tr className="text-white text-xl">
                          <th>Nombre</th>
                          <th>Goles</th>
                          <th>Equipo</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tablaGoleoIndividual
                          .slice() // Hacer una copia para evitar modificar el array original
                          .sort((a, b) => b.goles - a.goles) // Ordenar por goles de mayor a menor
                          .map((row, index) => (
                            <tr key={index}>
                              <td>{row.nombre}</td>
                              <td>{row.goles}</td>
                              <td>{row.equipo}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}
              {option === "Tabla de Goleo Individual" &&
                tablaGoleoIndividual.length === 0 && (
                  <div>No se encontraron resultados.</div>
                )}

              {/* Render for Calendario de Goleos */}
              {option === "Calendario de Goleos" &&
                calendarioGoleo.length > 0 && (
                  <div className="overflow-x-auto">
                    <table className="table text-xl">
                      <thead>
                        <tr className="text-white text-xl">
                          <th>Partido</th>
                          <th>Jornada</th>
                        </tr>
                      </thead>
                      <tbody>
                        {calendarioGoleo.map((row, index) => (
                          <tr key={index}>
                            <td>{row.partido}</td>
                            <td>{row.jornada}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

              {option === "Calendario de Goleos" &&
                calendarioGoleo.length === 0 && (
                  <div>No se encontraron resultados.</div>
                )}

              {/* Render for Calendario */}
              {option === "Calendario" && calendario.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="table text-xl">
                    <thead>
                      <tr className="text-white text-xl">
                        <th>Partido</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                      </tr>
                    </thead>
                    <tbody>
                      {calendario.map((row, index) => (
                        <tr key={index}>
                          <td>{row.partido}</td>
                          <td>{row.fechaJuego}</td>
                          <td>
                            {row.horaInicio.hours}:{row.horaInicio.minutes}
                            {row.horaInicio.seconds}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {option === "Calendario" && calendario.length === 0 && (
                <div>No se encontraron resultados.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Torneos;
