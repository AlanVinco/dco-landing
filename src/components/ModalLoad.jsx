import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  registrarCategoria,
  registrarTorneo,
  registrarEquipo,
  registrarJugador,
  relacionarJugadorEquipo,
  registrarPartido,
  registrarResultado,
  registrarGoleoIndividual,
} from "../redux/actions/adminSlice"; // Acciones de redux para realizar los POST

const ModalLoad = ({ selectedOption }) => {
  const dispatch = useDispatch();

  const [categoriaData, setCategoriaData] = useState({
    categoria: "",
    edadMinima: "",
    edadMaxima: "",
    idLiga: 4,
  });

  const [torneoData, setTorneoData] = useState({
    nombreTorneo: "",
    idCategoria: "",
    numeroEquipos: 80,
  });

  const [equipoData, setEquipoData] = useState({
    nombre: "",
    idTorneo: "",
  });

  const [categorias, setCategorias] = useState([]);
  const [torneos, setTorneos] = useState([]);

  // Fetch categorías al montar el componente (para Registrar Torneo y Registrar Equipo)
  useEffect(() => {
    if (
      selectedOption === "Registrar Torneo" ||
      selectedOption === "Registrar Equipo"
    ) {
      fetch(
        "https://www.dcoapi.somee.com/api/ObtenerDatos/MostrarCategorias?idLiga=4"
      )
        .then((res) => res.json())
        .then((data) => setCategorias(data));
    }
  }, [selectedOption]);

  // Fetch torneos según la categoría seleccionada (solo para Registrar Equipo)
  const handleCategoriaChange = (e) => {
    const idCategoria = e.target.value;
    setEquipoData({ ...equipoData, idTorneo: "" }); // Limpiar el torneo seleccionado al cambiar la categoría
    setTorneoData({ ...torneoData, idCategoria });

    fetch(
      `https://www.dcoapi.somee.com/api/ObtenerDatos/MostrarTorneos?idCategoria=${idCategoria}`
    )
      .then((res) => res.json())
      .then((data) => setTorneos(data));
  };

  const handleCategoriaSubmit = () => {
    if (
      categoriaData.categoria &&
      categoriaData.edadMinima &&
      categoriaData.edadMaxima
    ) {
      dispatch(registrarCategoria(categoriaData));
    } else {
      alert("Todos los campos son requeridos.");
    }
  };

  const handleTorneoSubmit = () => {
    if (torneoData.nombreTorneo && torneoData.idCategoria) {
      dispatch(registrarTorneo(torneoData));
    } else {
      alert("Todos los campos son requeridos.");
    }
  };

  const handleEquipoSubmit = () => {
    if (equipoData.nombre && equipoData.idTorneo) {
      dispatch(registrarEquipo(equipoData));
    } else {
      alert("Todos los campos son requeridos.");
    }
  };

  //REGISTRAR JUGADOR
  // Estado para el formulario de Registrar Jugador
  const [jugadorData, setJugadorData] = useState({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    fechaNacimiento: "",
    posicion: "",
    sexo: "",
    idEquipo: "",
    numeroCamisa: "",
    archivo: "",
    nombreArchivo: "",
    extension: "",
  });

  const [equipos, setEquipos] = useState([]);
  const [posiciones] = useState(["Portero", "Defensa", "Medio", "Delantero"]);
  const [sexos] = useState(["Masculino", "Femenino"]);

  // Fetch categorías al montar el componente
  useEffect(() => {
    if (selectedOption === "Registrar Jugador") {
      fetch(
        "https://www.dcoapi.somee.com/api/ObtenerDatos/MostrarCategorias?idLiga=4"
      )
        .then((res) => res.json())
        .then((data) => setCategorias(data));
    }
  }, [selectedOption]);

  // Convertir archivo a base64
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setJugadorData({
        ...jugadorData,
        archivo: reader.result.split(",")[1], // Convertir a base64
        nombreArchivo: file.name.split(".")[0],
        extension: `.${file.name.split(".").pop()}`,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJugadorData({ ...jugadorData, [name]: value });
  };

  const handleSubmitJugador = () => {
    const {
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      fechaNacimiento,
      posicion,
      sexo,
      idEquipo,
      numeroCamisa,
      archivo,
    } = jugadorData;

    if (
      nombre &&
      apellidoPaterno &&
      apellidoMaterno &&
      fechaNacimiento &&
      posicion &&
      sexo &&
      idEquipo &&
      numeroCamisa &&
      archivo
    ) {
      dispatch(registrarJugador(jugadorData)).then((response) => {
        if (response.payload.idJugador) {
          const { idJugador } = response.payload;
          dispatch(
            relacionarJugadorEquipo({ idEquipo, idJugador, numeroCamisa })
          );
        }
      });
    } else {
      alert("Todos los campos son requeridos.");
    }
  };

  // Fetch equipos según la categoría seleccionada
  const handleCategoriaUserChange = (e) => {
    const idCategoria = e.target.value;
    console.log(idCategoria);
    fetch(`https://www.dcoapi.somee.com/api/ObtenerDatos/ObtenerEquipos`)
      .then((res) => res.json())
      .then((data) =>
        setEquipos(
          data.filter((equipo) => equipo.idCategoria === parseInt(idCategoria))
        )
      );
  };
  // AGREGAR PARTIDOS:
  const [partidoData, setPartidoData] = useState({
    idEquipoLocal: "",
    idEquipoVisita: "",
    fechaJuego: "",
    horaInicioJuego: "",
    idTorneo: "",
    jornada: "",
  });

  // Fetch categorías al montar el componente (para seleccionar categoría)
  useEffect(() => {
    if (
      selectedOption === "Ingresar Partido" ||
      selectedOption === "Registrar Resultado" ||
      selectedOption === "Registrar Goleo Individual"
    ) {
      fetch(
        "https://www.dcoapi.somee.com/api/ObtenerDatos/MostrarCategorias?idLiga=4"
      )
        .then((res) => res.json())
        .then((data) => setCategorias(data));
    }
  }, [selectedOption]);

  // Manejar cambios en el selector de Categoría para filtrar los torneos
  const handleCategoriaChangePartido = (e) => {
    const idCategoria = e.target.value;
    setPartidoData({
      ...partidoData,
      idTorneo: "",
      idEquipoLocal: "",
      idEquipoVisita: "",
    });
    fetch(
      `https://www.dcoapi.somee.com/api/ObtenerDatos/MostrarTorneos?idCategoria=${idCategoria}`
    )
      .then((res) => res.json())
      .then((data) => setTorneos(data));

    // También obtener los equipos de la categoría seleccionada
    fetch(`https://www.dcoapi.somee.com/api/ObtenerDatos/ObtenerEquipos`)
      .then((res) => res.json())
      .then((data) =>
        setEquipos(
          data.filter((equipo) => equipo.idCategoria === parseInt(idCategoria))
        )
      );
  };

  // Manejar el envío del formulario
  const handleSubmitPartido = () => {
    const {
      idEquipoLocal,
      idEquipoVisita,
      fechaJuego,
      horaInicioJuego,
      idTorneo,
      jornada,
    } = partidoData;

    if (
      idEquipoLocal &&
      idEquipoVisita &&
      fechaJuego &&
      horaInicioJuego &&
      idTorneo &&
      jornada
    ) {
      dispatch(registrarPartido(partidoData)).then((response) => {
        if (response.payload.success) {
          alert("Partido registrado con éxito");
          // Cerrar modal o limpiar el formulario si es necesario
        } else {
          alert("Hubo un error al registrar el partido");
        }
      });
    } else {
      alert("Todos los campos son requeridos.");
    }
  };

  //REGISTRAR RESULTADO
  // Estado para Registrar Resultado
  const [resultadoData, setResultadoData] = useState({
    idPartido: "",
    golesLocal: "",
    golesVisita: "",
    idEquipoLocal: "",
    idEquipoVisita: "",
    idTorneo: "",
  });

  const [partidos, setPartidos] = useState([]); // Para listar partidos disponibles

  // Fetch para obtener jugadores cuando se selecciona un partido
  const handlePartidoChange = (e) => {
    const idTorneo = e.target.value;
    setResultadoData({ ...resultadoData, idTorneo });
    setGoleoData({ ...goleoData, idTorneo });
    // Obtener jugadores según el partido
    fetch(
      `https://www.dcoapi.somee.com/api/ObtenerDatos/ObtineCalendario?idTorneo=${idTorneo}`
    )
      .then((res) => res.json())
      .then((data) => setPartidos(data));
  };

  // Manejar el cambio de los campos del resultado
  const handleResultadoInputChange = (e) => {
    const { name, value } = e.target;
    setResultadoData({ ...resultadoData, [name]: value });
  };

  // Manejar el envío del formulario para registrar el resultado
  const handleSubmitResultado = () => {
    const {
      idPartido,
      golesLocal,
      golesVisita,
      idEquipoLocal,
      idEquipoVisita,
      idTorneo,
    } = resultadoData;

    if (
      idPartido !== "" &&
      golesLocal !== "" &&
      golesVisita !== "" &&
      idEquipoLocal !== "" &&
      idEquipoVisita !== "" &&
      idTorneo !== ""
    ) {
      dispatch(registrarResultado(resultadoData)).then((response) => {
        // if (response.payload.success) {
        //   alert("Resultado registrado con éxito");
        // Limpiar formulario o cerrar modal
        // } else {
        //   alert("Hubo un error al registrar el resultado");
        // }
        console.log("se enviaron");
      });
    } else {
      alert("Todos los campos son requeridos.");
    }
  };

  //Registrar goleo INDIVIDUAL
  const [goleoData, setGoleoData] = useState({
    idTorneo: "",
    idPartido: "",
    idEquipo: "",
    idJugador: "",
    numeroJugador: "",
    goles: "",

    equipoSeleccionado: "",
    idEquipoLocal: "",
    idEquipoVisita: "",
    nombreEquipoLocal: "",
    nombreEquipoVisita: "",
  });

  const [jugadoresGoleo, setJugadoresGoleo] = useState([]);

  const handleGoleoInputChange = (e) => {
    const { name, value } = e.target;
    setGoleoData({ ...goleoData, [name]: value });
  };

  const handleSubmitGoleo = () => {
    console.log(goleoData)
    const {
      idPartido,
      idTorneo,
      idEquipo,
      idJugador,
      numeroJugador,
      goles,
    } = goleoData;

    if (
      idPartido !== "" &&
      idEquipo !== "" &&
      idJugador !== "" &&
      numeroJugador !== "" &&
      goles !== "" &&
      idTorneo !== ""
    ) {
      dispatch(registrarGoleoIndividual(goleoData)).then((response) => {
        // if (response.payload.success) {
        //   alert("Resultado registrado con éxito");
        // Limpiar formulario o cerrar modal
        // } else {
        //   alert("Hubo un error al registrar el resultado");
        // }
        console.log("se enviaron");
      });
    } else {
      alert("Todos los campos son requeridos.");
    }
  };

  useEffect(() => {
    // Obtener jugadores según el partido
    if (goleoData.equipoSeleccionado !== ""){
      fetch(
        `https://www.dcoapi.somee.com/api/ObtenerDatos/ObtenerEquipos`
      )
        .then((res) => res.json())
        .then((data) => {

          const result = data.filter((name) => name.nombre === goleoData.equipoSeleccionado);
          
          if (result.length > 0){

            let idEquipo = result[0].idEquipo

            setGoleoData({
              ...goleoData,
              idEquipo,
            })

            fetch(
              `https://www.dcoapi.somee.com/api/ObtenerDatos/MuestraJugadores?idEquipo=${idEquipo}`
            )
              .then((res) => res.json())
              .then((data) => setJugadoresGoleo(data));
          }
        });
    }
  }, [goleoData.equipoSeleccionado]);

  return (
    <div>
      {selectedOption === "Registrar Categoría" && (
        <div>
          <h2>Registrar Categoría</h2>
          <input
            type="text"
            placeholder="Nombre de la categoría"
            value={categoriaData.categoria}
            onChange={(e) =>
              setCategoriaData({ ...categoriaData, categoria: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Edad Mínima"
            value={categoriaData.edadMinima}
            onChange={(e) =>
              setCategoriaData({ ...categoriaData, edadMinima: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Edad Máxima"
            value={categoriaData.edadMaxima}
            onChange={(e) =>
              setCategoriaData({ ...categoriaData, edadMaxima: e.target.value })
            }
          />
          <button className="text-white" onClick={handleCategoriaSubmit}>
            Registrar Categoría
          </button>
        </div>
      )}

      {selectedOption === "Registrar Torneo" && (
        <div>
          <h2>Registrar Torneo</h2>
          <select
            value={torneoData.idCategoria}
            onChange={handleCategoriaChange}
          >
            <option value="" disabled>
              Selecciona categoría
            </option>
            {categorias.map((categoria) => (
              <option key={categoria.idCategoria} value={categoria.idCategoria}>
                {categoria.categoria}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Nombre del Torneo"
            value={torneoData.nombreTorneo}
            onChange={(e) =>
              setTorneoData({ ...torneoData, nombreTorneo: e.target.value })
            }
          />
          <button className="text-white" onClick={handleTorneoSubmit}>
            Registrar Torneo
          </button>
        </div>
      )}

      {selectedOption === "Registrar Equipo" && (
        <div>
          <h2>Registrar Equipo</h2>
          <select onChange={handleCategoriaChange}>
            <option value="" disabled>
              Selecciona categoría
            </option>
            {categorias.map((categoria) => (
              <option key={categoria.idCategoria} value={categoria.idCategoria}>
                {categoria.categoria}
              </option>
            ))}
          </select>
          <select
            value={equipoData.idTorneo}
            onChange={(e) =>
              setEquipoData({ ...equipoData, idTorneo: e.target.value })
            }
          >
            <option value="" disabled>
              Selecciona torneo
            </option>
            {torneos.map((torneo) => (
              <option key={torneo.idTorneo} value={torneo.idTorneo}>
                {torneo.nombre}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Nombre del equipo"
            value={equipoData.nombre}
            onChange={(e) =>
              setEquipoData({ ...equipoData, nombre: e.target.value })
            }
          />
          <button className="text-white" onClick={handleEquipoSubmit}>
            Registrar Equipo
          </button>
        </div>
      )}

      {selectedOption === "Registrar Jugador" && (
        <div>
          <h2>Registrar Jugador</h2>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre del jugador"
            value={jugadorData.nombre}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="apellidoPaterno"
            placeholder="Apellido Paterno"
            value={jugadorData.apellidoPaterno}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="apellidoMaterno"
            placeholder="Apellido Materno"
            value={jugadorData.apellidoMaterno}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="fechaNacimiento"
            value={jugadorData.fechaNacimiento}
            onChange={handleInputChange}
          />
          <select name="idCategoria" onChange={handleCategoriaUserChange}>
            <option value="" disabled>
              Selecciona categoría
            </option>
            {categorias.map((categoria, index) => (
              <option key={index} value={categoria.idCategoria}>
                {categoria.categoria}
              </option>
            ))}
          </select>
          <select
            name="idEquipo"
            value={jugadorData.idEquipo}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Selecciona equipo
            </option>
            {equipos.map((equipo, index) => (
              <option key={index} value={equipo.idEquipo}>
                {equipo.nombre}
              </option>
            ))}
          </select>
          <select
            name="posicion"
            value={jugadorData.posicion}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Selecciona posición
            </option>
            {posiciones.map((pos, idx) => (
              <option key={idx} value={pos.toLowerCase()}>
                {pos}
              </option>
            ))}
          </select>
          <select
            name="sexo"
            value={jugadorData.sexo}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Selecciona sexo
            </option>
            {sexos.map((sexo, idx) => (
              <option key={idx} value={sexo.toLowerCase()}>
                {sexo}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="numeroCamisa"
            placeholder="Número de playera"
            value={jugadorData.numeroCamisa}
            onChange={handleInputChange}
          />
          <input type="file" accept=".jpg,.png" onChange={handleFileChange} />
          <button className="text-white" onClick={handleSubmitJugador}>
            Registrar Jugador
          </button>
        </div>
      )}

      {selectedOption === "Ingresar Partido" && (
        <div>
          <h2>Ingresar Partido</h2>

          <select onChange={handleCategoriaChangePartido}>
            <option value="" disabled>
              Selecciona categoría
            </option>
            {categorias.map((categoria, index) => (
              <option key={index} value={categoria.idCategoria}>
                {categoria.categoria}
              </option>
            ))}
          </select>

          <select
            value={partidoData.idTorneo}
            onChange={(e) =>
              setPartidoData({ ...partidoData, idTorneo: e.target.value })
            }
          >
            <option value="" disabled>
              Selecciona Torneo
            </option>
            {torneos.map((torneo, index) => (
              <option key={index} value={torneo.idTorneo}>
                {torneo.nombre}
              </option>
            ))}
          </select>

          <select
            value={partidoData.idEquipoLocal}
            onChange={(e) =>
              setPartidoData({ ...partidoData, idEquipoLocal: e.target.value })
            }
          >
            <option value="" disabled>
              Equipo Local
            </option>
            {equipos.map((equipo) => (
              <option key={equipo.idEquipo} value={equipo.idEquipo}>
                {equipo.nombre}
              </option>
            ))}
          </select>

          <select
            value={partidoData.idEquipoVisita}
            onChange={(e) =>
              setPartidoData({ ...partidoData, idEquipoVisita: e.target.value })
            }
          >
            <option value="" disabled>
              Equipo Visita
            </option>
            {equipos.map((equipo) => (
              <option key={equipo.idEquipo} value={equipo.idEquipo}>
                {equipo.nombre}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={partidoData.fechaJuego}
            onChange={(e) =>
              setPartidoData({ ...partidoData, fechaJuego: e.target.value })
            }
          />
          <input
            type="time"
            value={partidoData.horaInicioJuego}
            onChange={(e) =>
              setPartidoData({
                ...partidoData,
                horaInicioJuego: e.target.value,
              })
            }
          />
          <input
            type="number"
            placeholder="Jornada"
            value={partidoData.jornada}
            onChange={(e) =>
              setPartidoData({ ...partidoData, jornada: e.target.value })
            }
          />

          <button className="text-white" onClick={handleSubmitPartido}>
            Registrar Partido
          </button>
        </div>
      )}

      {selectedOption === "Registrar Resultado" && (
        <div>
          <h2 className="text-white">Registrar Resultado</h2>

          <select onChange={handleCategoriaChangePartido}>
            <option value="" disabled>
              Selecciona categoría
            </option>
            {categorias.map((categoria, index) => (
              <option key={index} value={categoria.idCategoria}>
                {categoria.categoria}
              </option>
            ))}
          </select>

          <select value={resultadoData.idTorneo} onChange={handlePartidoChange}>
            <option value="" disabled>
              Selecciona Torneo
            </option>
            {torneos.map((torneo, index) => (
              <option key={index} value={torneo.idTorneo}>
                {torneo.nombre}
              </option>
            ))}
          </select>

          {resultadoData.idTorneo !== "" && (
            <div>
              <select
                onChange={(e) =>
                  setResultadoData({
                    ...resultadoData,
                    idPartido: e.target.value.split("-")[0],
                    idEquipoLocal: e.target.value.split("-")[1],
                    idEquipoVisita: e.target.value.split("-")[2],
                  })
                }
              >
                <option value="" disabled>
                  Selecciona Torneo
                </option>
                {partidos.map((partido) => (
                  <option
                    key={partido.idPartido}
                    value={`${partido.idPartido}-${partido.idEquipoLocal}-${partido.idEquipoVisita}`}
                  >
                    {partido.nombreEquipoLocal} vs {partido.nombreEquipoVisita}
                  </option>
                ))}
              </select>
            </div>
          )}
          {resultadoData.idPartido !== "" && (
            <div>
              <input
                type="number"
                name="golesLocal"
                placeholder="Goles equipo local"
                value={resultadoData.golesLocal}
                onChange={handleResultadoInputChange}
              />
              <input
                type="number"
                name="golesVisita"
                placeholder="Goles equipo visitante"
                value={resultadoData.golesVisita}
                onChange={handleResultadoInputChange}
              />
            </div>
          )}
          <button className="text-white" onClick={handleSubmitResultado}>
            Registrar Resultado
          </button>
        </div>
      )}

      {selectedOption === "Registrar Goleo Individual" && (
        <div>
          <h2 className="text-white">Registrar Resultado</h2>

          <select onChange={handleCategoriaChangePartido}>
            <option value="" disabled>
              Selecciona categoría
            </option>
            {categorias.map((categoria, index) => (
              <option key={index} value={categoria.idCategoria}>
                {categoria.categoria}
              </option>
            ))}
          </select>

          <select value={resultadoData.idTorneo} onChange={handlePartidoChange}>
            <option value="" disabled>
              Selecciona Torneo
            </option>
            {torneos.map((torneo, index) => (
              <option key={index} value={torneo.idTorneo}>
                {torneo.nombre}
              </option>
            ))}
          </select>

          {goleoData.idTorneo !== "" && (
            <div>
              <select
                onChange={(e) =>
                  setGoleoData({
                    ...goleoData,
                    idPartido: e.target.value.split("-")[0],
                    idEquipoLocal: e.target.value.split("-")[1],
                    idEquipoVisita: e.target.value.split("-")[2],
                    nombreEquipoLocal: e.target.value.split("-")[3],
                    nombreEquipoVisita: e.target.value.split("-")[4],
                  })
                }
              >
                <option value="" disabled>
                  Selecciona Torneo
                </option>
                {partidos.map((partido) => (
                  <option
                    key={partido.idPartido}
                    value={`${partido.idPartido}-${partido.idEquipoLocal}-${partido.idEquipoVisita}-${partido.nombreEquipoLocal}-${partido.nombreEquipoVisita}`}
                  >
                    {partido.nombreEquipoLocal} vs {partido.nombreEquipoVisita}
                  </option>
                ))}
              </select>
            </div>
          )}
          {goleoData.idPartido !== "" && (
            <div>
              <select
                onChange={(e) =>
                  setGoleoData({
                    ...goleoData,
                    equipoSeleccionado: e.target.value,
                  })
                }
              >
                <option value="" disabled>
                  Selecciona Equipo
                </option>
                <option value={goleoData.nombreEquipoLocal}>
                  {goleoData.nombreEquipoLocal}
                </option>
                <option value={goleoData.nombreEquipoVisita}>
                  {goleoData.nombreEquipoVisita}
                </option>
              </select>

              {/* <input
                type="number"
                name="golesLocal"
                placeholder="Goles equipo local"
                value={resultadoData.golesLocal}
                onChange={handleResultadoInputChange}
              />
              <input
                type="number"
                name="golesVisita"
                placeholder="Goles equipo visitante"
                value={resultadoData.golesVisita}
                onChange={handleResultadoInputChange}
              /> */}
            </div>
          )}
          {jugadoresGoleo.length > 0 && (
            <div>
              <select
                onChange={(e) =>
                  setGoleoData({
                    ...goleoData,
                    idJugador: e.target.value.split("-")[0],
                    numeroJugador: e.target.value.split("-")[1],
                  })
                }
              >
                <option value="" disabled>
                  Selecciona Jugador
                </option>
                {jugadoresGoleo.map((jugador, index) => (
                  <option
                    key={index}
                    value={`${jugador.identificador}-${jugador.playera}`}
                  >
                    {jugador.nombreJugador}
                  </option>
                ))}
              </select>
            </div>
          )}
          {goleoData.idJugador !== "" && (
            <div>
              <input
                type="number"
                name="goles"
                placeholder="Goles del jugador"
                onChange={handleGoleoInputChange}
              />
            </div>
          )}
          <button className="text-white" onClick={handleSubmitGoleo}>
            Registrar Goleo
          </button>
        </div>
      )}
    </div>
  );
};

export default ModalLoad;
