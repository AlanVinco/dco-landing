import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategorias, fetchEquipos, fetchTorneos, fetchCalendario, setSelectedCategoria, setSelectedTorneo, 
  fetchTablaGeneralVacia, fetchTablaGeneral, fetchTablaGoleoIndividual, fetchCalendarioGoleo} from '../redux/actions/torneosSlice';

const Torneos = () => {
  const dispatch = useDispatch();
  const {
    categorias, equipos, torneos, calendario, selectedCategoria, selectedTorneo,
    loading, idCategoria, idTorneo, tablaGeneral, tablaGeneralVacia,
    tablaGoleoIndividual, calendarioGoleo
  } = useSelector((state) => state.torneos);

  const [option, setOption] = useState('');

  useEffect(() => {
    dispatch(fetchCategorias());
  }, [dispatch]);

  const handleCategoriaChange = (e) => {
    const idCategoria = e.target.value;
    dispatch(setSelectedCategoria(idCategoria));
    dispatch(fetchEquipos(idCategoria));
    dispatch(fetchTorneos(idCategoria));
  };

  const handleTorneoChange = (e) => {
    const idTorneo = e.target.value;
    dispatch(setSelectedTorneo(idTorneo));
    dispatch(fetchCalendario(idTorneo));
  };

  const handleOptionChange = (e) => {
    setOption(e.target.value);

    console.log(selectedCategoria, selectedTorneo)
    
    // Aseguramos que idCategoria y idTorneo tengan valores
    if (selectedCategoria && selectedTorneo) {
      switch (e.target.value) {
        case 'Tabla General Vacía':
          dispatch(fetchTablaGeneralVacia({ selectedCategoria, selectedTorneo }));
          break;
        case 'Tabla General':
          dispatch(fetchTablaGeneral({ selectedCategoria, selectedTorneo }));
          break;
        case 'Tabla de Goleo Individual':
          dispatch(fetchTablaGoleoIndividual(selectedTorneo));
          break;
        case 'Calendario de Goleos':
          dispatch(fetchCalendarioGoleo(selectedTorneo));
          break;
        case 'Calendario':
          dispatch(fetchCalendario(selectedTorneo));
          break;
        default:
          break;
      }
    }
  };
  return (
    <div className="p-4">
      {loading && <p>Cargando...</p>}

      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700 text-white">Categorías</label>
        <select
          className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500"
          onChange={handleCategoriaChange}
          value={selectedCategoria || ''}
        >
          <option value="">Seleccione una categoría</option>
          {categorias.map((categoria) => (
            <option key={categoria.idCategoria} value={categoria.idCategoria}>
              {categoria.categoria}
            </option>
          ))}
        </select>
      </div>

      {equipos.length > 0 && (
        <div className="mb-4 text-white">
          <h2 className="text-lg font-bold mb-2">Equipos</h2>
          <table className="min-w-full border">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Equipo</th>
              </tr>
            </thead>
            <tbody>
              {equipos.map((equipo, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border">{equipo.equipo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {torneos.length > 0 && (
        <div className="mb-4 ">
          <label className="block mb-2 text-sm font-bold text-gray-700 text-white">Torneos</label>
          <select
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500"
            onChange={handleTorneoChange}
            value={selectedTorneo || ''}
          >
            <option value="">Seleccione un torneo</option>
            {torneos.map((torneo) => (
              <option key={torneo.idTorneo} value={torneo.idTorneo}>
                {torneo.nombre}
              </option>
            ))}
          </select>
        </div>
      )}

      {calendario.length > 0 && (
        <div className="mb-4 text-white">
          <h2 className="text-lg font-bold mb-2">Calendario</h2>
          <table className="min-w-full border">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Partido</th>
                <th className="px-4 py-2 border">Fecha</th>
                <th className="px-4 py-2 border">Hora</th>
              </tr>
            </thead>
            <tbody>
              {calendario.map((partido) => (
                <tr key={partido.idPartido}>
                  <td className="px-4 py-2 border">{partido.partido}</td>
                  <td className="px-4 py-2 border">{partido.fechaJuego}</td>
                  <td className="px-4 py-2 border">{`${partido.horaInicio.hours}:${partido.horaInicio.minutes}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* selector */}
    <div className="container mx-auto p-4 text-white">
      <div className="mb-4">
        <label className="block text-gray-700 text-white">Selecciona una opción:</label>
        <select className="mt-1 block w-full p-2 border text-black" onChange={handleOptionChange} value={option}>
          <option value="">Seleccionar</option>
          <option value="Tabla General Vacía">Tabla General Vacía</option>
          <option value="Tabla General">Tabla General</option>
          <option value="Tabla de Goleo Individual">Tabla de Goleo Individual</option>
          <option value="Calendario de Goleos">Calendario de Goleos</option>
          <option value="Calendario">Calendario</option>
        </select>
      </div>

      {/* Conditionally render tables based on selected option */}
      {option === 'Tabla General Vacía' && tablaGeneralVacia.length > 0 && (
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th>Equipo</th>
              <th>Puntos</th>
              <th>JJ</th>
              {/* Other table headers */}
            </tr>
          </thead>
          <tbody>
            {tablaGeneralVacia.map((row, index) => (
              <tr key={index}>
                <td>{row.equipo}</td>
                <td>{row.puntos}</td>
                <td>{row.jj}</td>
                {/* Other table data */}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {option === 'Tabla General' && tablaGeneral.length > 0 && (
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th>Equipo</th>
              <th>Puntos</th>
              <th>JJ</th>
              {/* Other table headers */}
            </tr>
          </thead>
          <tbody>
            {tablaGeneral.map((row, index) => (
              <tr key={index}>
                <td>{row.equipo}</td>
                <td>{row.puntos}</td>
                <td>{row.jj}</td>
                {/* Other table data */}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Render for Tabla de Goleo Individual */}
      {option === 'Tabla de Goleo Individual' && tablaGoleoIndividual.length > 0 && (
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Goles</th>
              <th>Equipo</th>
            </tr>
          </thead>
          <tbody>
            {tablaGoleoIndividual.map((row, index) => (
              <tr key={index}>
                <td>{row.nombre}</td>
                <td>{row.goles}</td>
                <td>{row.equipo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Render for Calendario de Goleos */}
      {option === 'Calendario de Goleos' && calendarioGoleo.length > 0 && (
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th>Partido</th>
              <th>Fecha</th>
              <th>Hora</th>
            </tr>
          </thead>
          <tbody>
            {calendarioGoleo.map((row, index) => (
              <tr key={index}>
                <td>{row.partido}</td>
                <td>{row.fechaJuego}</td>
                <td>{row.horaInicio.hours}:{row.horaInicio.minutes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Render for Calendario */}
      {option === 'Calendario' && calendario.length > 0 && (
        <table className="min-w-full table-auto">
          <thead>
            <tr>
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
                  <td>{row.horaInicio.hours}:{row.horaInicio.minutes}</td> 
                  </tr> ))} 
              </tbody> 
          </table> )} 
      </div>
    </div>
  );
};

export default Torneos;
