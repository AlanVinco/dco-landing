import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  registrarCategoria,
  registrarTorneo,
  registrarEquipo,
  registrarJugador,
  relacionarJugadorEquipo,
  registrarPartido,
  registrarResultado,
  registrarGoleoIndividual,
  registrarGoleoTotal,
} from "../redux/actions/adminSlice"; // Acciones de redux para realizar los POST
import Alert from "../components/Alert";

const ModalLoad = ({ selectedOption }) => {
  const dispatch = useDispatch();
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  //Registrar Categoria:
  const statusAdmin = useSelector((state) => state.admin.status); // Estado del registro

  //Alertas:
  const showSuccessAlert = (value) => {
    setAlertMessage(`Se guardó correctamente`);
    setAlertType("success");
    setCategoriaData({
      categoria: "",
      edadMinima: "",
      edadMaxima: "",
      idLiga: 4,
    });
    setTorneoData({
      nombreTorneo: "",
      idCategoria: "",
      numeroEquipos: 80,
    });
    setEquipoData({
      nombre: "",
      idTorneo: "",
    });
    setJugadorData({
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
    setPartidoData({
      idEquipoLocal: "",
      idEquipoVisita: "",
      fechaJuego: "",
      horaInicioJuego: "",
      idTorneo: "",
      jornada: "",
    });
    setResultadoData({
      idPartido: "",
      golesLocal: "",
      golesVisita: "",
      idEquipoLocal: "",
      idEquipoVisita: "",
      idTorneo: "",
    });
    setGoleoData({
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
  };

  const showErrorAlert = () => {
    setAlertMessage("A ocurrido un error.");
    setAlertType("error");
  };

  const handleCloseAlert = () => {
    setAlertMessage(""); // Esto hará que la alerta se cierre
  };

  useEffect(() => {
    if (statusAdmin === "succeeded") {
      showSuccessAlert();
    } else if (statusAdmin === "failed") {
      showErrorAlert();
    }
  }, [statusAdmin]); // Se ejecuta cuando cambian estos valores

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
      selectedOption === "Registrar Goleo Individual" ||
      selectedOption === "Registrar Goleo Total"
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
          // Cerrar modal o limpiar el formulario si es necesario
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
    setGoleoTotal({ ...goleoData, idTorneo });
    // Obtener jugadores según el partido
    fetch(
      `https://www.dcoapi.somee.com/api/ObtenerDatos/ObtineCalendarioGoleo?idTorneo=${idTorneo}`
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
    const { idPartido, idTorneo, idEquipo, idJugador, numeroJugador, goles } =
      goleoData;

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
      });
    } else {
      alert("Todos los campos son requeridos.");
    }
  };

  useEffect(() => {
    // Obtener jugadores según el partido
    if (goleoData.equipoSeleccionado !== "") {
      fetch(`https://www.dcoapi.somee.com/api/ObtenerDatos/ObtenerEquipos`)
        .then((res) => res.json())
        .then((data) => {
          const result = data.filter(
            (name) => name.nombre === goleoData.equipoSeleccionado
          );

          if (result.length > 0) {
            let idEquipo = result[0].idEquipo;

            setGoleoData({
              ...goleoData,
              idEquipo,
            });

            fetch(
              `https://www.dcoapi.somee.com/api/ObtenerDatos/MuestraJugadores?idEquipo=${idEquipo}`
            )
              .then((res) => res.json())
              .then((data) => setJugadoresGoleo(data));
          }
        });
    }
  }, [goleoData.equipoSeleccionado]);

  //Registrar GOLEO TOTAL

  const [goleoTotal, setGoleoTotal] = useState({
    idTorneo: "",
    idPartido: "",
    idEquipo: "",
    golesAnotados: "",
    golesRecibidos: "",
    resultado: "",

    equipoSeleccionado: "",
    idEquipoLocal: "",
    idEquipoVisita: "",
    nombreEquipoLocal: "",
    nombreEquipoVisita: "",
  });

  useEffect(() => {
    // Obtener jugadores según el partido
    if (goleoTotal.equipoSeleccionado !== "") {
      fetch(`https://www.dcoapi.somee.com/api/ObtenerDatos/ObtenerEquipos`)
        .then((res) => res.json())
        .then((data) => {
          const result = data.filter(
            (name) => name.nombre === goleoTotal.equipoSeleccionado
          );

          if (result.length > 0) {
            let idEquipo = result[0].idEquipo;

            setGoleoTotal({
              ...goleoTotal,
              idEquipo,
            });
          }
        });
    }
  }, [goleoTotal.equipoSeleccionado]);

  const handleGoleoTotalInputChange = (e) => {
    const { name, value } = e.target;
    setGoleoTotal({ ...goleoTotal, [name]: value });
  };

  const handleSubmitGoleoTotal = () => {
    const {
      idPartido,
      idTorneo,
      idEquipo,
      golesAnotados,
      golesRecibidos,
      resultado,
    } = goleoTotal;

    if (
      idPartido !== "" &&
      idEquipo !== "" &&
      golesAnotados !== "" &&
      golesRecibidos !== "" &&
      resultado !== "" &&
      idTorneo !== ""
    ) {
      dispatch(registrarGoleoTotal(goleoTotal)).then((response) => {
        // if (response.payload.success) {
        //   alert("Resultado registrado con éxito");
        // Limpiar formulario o cerrar modal
        // } else {
        //   alert("Hubo un error al registrar el resultado");
        // }
      });
    } else {
      alert("Todos los campos son requeridos.");
    }
  };

  return (
    <div>
      <div className="fixed bottom-0 right-0 z-50">
      <Alert
        message={alertMessage}
        type={alertType}
        duration={1000}
        onClose={handleCloseAlert}
      />
      </div>
      {selectedOption === "Registrar Categoría" && (
        <div className="space-y-4">
          <h3 className="font-bold text-lg text-white">Registrar Categoría</h3>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M.102 2.223a5.225 5.225 0 0 0 6.523 7.426l6.879 6.878a1.5 1.5 0 1 0 2.121-2.121l-6.878-6.879A5.225 5.225 0 0 0 2.222.102l1.415 1.415a2.5 2.5 0 0 1 2.657 4.116l-.643.643a2.5 2.5 0 1 1-3.536-3.536l-.643-.643a5.225 5.225 0 0 0-2.07 1.126z" />
            </svg>

            <input
              type="text"
              className="grow"
              placeholder="Nombre de la categoría"
              value={categoriaData.categoria}
              onChange={(e) =>
                setCategoriaData({
                  ...categoriaData,
                  categoria: e.target.value,
                })
              }
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M.102 2.223a5.225 5.225 0 0 0 6.523 7.426l6.879 6.878a1.5 1.5 0 1 0 2.121-2.121l-6.878-6.879A5.225 5.225 0 0 0 2.222.102l1.415 1.415a2.5 2.5 0 0 1 2.657 4.116l-.643.643a2.5 2.5 0 1 1-3.536-3.536l-.643-.643a5.225 5.225 0 0 0-2.07 1.126z" />
            </svg>

            <input
              type="number"
              className="grow"
              placeholder="Edad Mínima"
              value={categoriaData.edadMinima}
              onChange={(e) =>
                setCategoriaData({
                  ...categoriaData,
                  edadMinima: e.target.value,
                })
              }
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M.102 2.223a5.225 5.225 0 0 0 6.523 7.426l6.879 6.878a1.5 1.5 0 1 0 2.121-2.121l-6.878-6.879A5.225 5.225 0 0 0 2.222.102l1.415 1.415a2.5 2.5 0 0 1 2.657 4.116l-.643.643a2.5 2.5 0 1 1-3.536-3.536l-.643-.643a5.225 5.225 0 0 0-2.07 1.126z" />
            </svg>

            <input
              type="number"
              placeholder="Edad Máxima"
              value={categoriaData.edadMaxima}
              onChange={(e) =>
                setCategoriaData({
                  ...categoriaData,
                  edadMaxima: e.target.value,
                })
              }
            />
          </label>
          {/* <span className="my-3 text-red-500">Todos los campos son requeridos.</span> */}
          <br />
          <button
            className="btn bg-[#1A1A2E] text-white hover:bg-[#8B0000] glass"
            onClick={handleCategoriaSubmit}
          >
            Registrar Categoría
          </button>
        </div>
      )}

      {selectedOption === "Registrar Torneo" && (
        <div className="space-y-4">
          <h3 className="font-bold text-lg text-white">Registrar Torneo</h3>
          <select
            className="select select-error w-full text-lg shadow-xl"
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
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M.102 2.223a5.225 5.225 0 0 0 6.523 7.426l6.879 6.878a1.5 1.5 0 1 0 2.121-2.121l-6.878-6.879A5.225 5.225 0 0 0 2.222.102l1.415 1.415a2.5 2.5 0 0 1 2.657 4.116l-.643.643a2.5 2.5 0 1 1-3.536-3.536l-.643-.643a5.225 5.225 0 0 0-2.07 1.126z" />
            </svg>

            <input
              type="text"
              placeholder="Nombre del Torneo"
              value={torneoData.nombreTorneo}
              onChange={(e) =>
                setTorneoData({ ...torneoData, nombreTorneo: e.target.value })
              }
            />
          </label>
          <button
            className="btn bg-[#1A1A2E] text-white hover:bg-[#8B0000] glass"
            onClick={handleTorneoSubmit}
          >
            Registrar Torneo
          </button>
        </div>
      )}

      {selectedOption === "Registrar Equipo" && (
        <div className="space-y-4">
          <h className="font-bold text-lg text-white">Registrar Equipo</h>
          <select
            className="select select-error w-full text-lg shadow-xl"
            onChange={handleCategoriaChange}
          >
            <option value="" selected disabled>
              Selecciona categoría
            </option>
            {categorias.map((categoria) => (
              <option key={categoria.idCategoria} value={categoria.idCategoria}>
                {categoria.categoria}
              </option>
            ))}
          </select>
          <select
            className="select select-error w-full text-lg shadow-xl"
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
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M.102 2.223a5.225 5.225 0 0 0 6.523 7.426l6.879 6.878a1.5 1.5 0 1 0 2.121-2.121l-6.878-6.879A5.225 5.225 0 0 0 2.222.102l1.415 1.415a2.5 2.5 0 0 1 2.657 4.116l-.643.643a2.5 2.5 0 1 1-3.536-3.536l-.643-.643a5.225 5.225 0 0 0-2.07 1.126z" />
            </svg>

            <input
              type="text"
              placeholder="Nombre del equipo"
              value={equipoData.nombre}
              onChange={(e) =>
                setEquipoData({ ...equipoData, nombre: e.target.value })
              }
            />
          </label>
          <button
            className="btn bg-[#1A1A2E] text-white hover:bg-[#8B0000] glass"
            onClick={handleEquipoSubmit}
          >
            Registrar Equipo
          </button>
        </div>
      )}

      {selectedOption === "Registrar Jugador" && (
        <div className="space-y-4">
          <h3 className="font-bold text-lg text-white">Registrar Jugador</h3>
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
              type="text"
              name="nombre"
              placeholder="Nombre del jugador"
              value={jugadorData.nombre}
              onChange={handleInputChange}
            />
          </label>
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
              type="text"
              name="apellidoPaterno"
              placeholder="Apellido Paterno"
              value={jugadorData.apellidoPaterno}
              onChange={handleInputChange}
            />
          </label>
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
              type="text"
              name="apellidoMaterno"
              placeholder="Apellido Materno"
              value={jugadorData.apellidoMaterno}
              onChange={handleInputChange}
            />
          </label>
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
              type="date"
              name="fechaNacimiento"
              value={jugadorData.fechaNacimiento}
              onChange={handleInputChange}
            />
          </label>
          <select
            className="select select-error w-full text-lg shadow-xl"
            name="idCategoria"
            onChange={handleCategoriaUserChange}
          >
            <option value="" disabled selected>
              Selecciona categoría
            </option>
            {categorias.map((categoria, index) => (
              <option key={index} value={categoria.idCategoria}>
                {categoria.categoria}
              </option>
            ))}
          </select>
          <select
            className="select select-error w-full text-lg shadow-xl"
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
            className="select select-error w-full text-lg shadow-xl"
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
            className="select select-error w-full text-lg shadow-xl"
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
              type="number"
              name="numeroCamisa"
              placeholder="Número de playera"
              value={jugadorData.numeroCamisa}
              onChange={handleInputChange}
            />
          </label>
          <input
            type="file"
            className="file-input file-input-bordered w-full"
            accept=".jpg,.png"
            onChange={handleFileChange}
          />
          <button
            className="btn bg-[#1A1A2E] text-white hover:bg-[#8B0000] glass"
            onClick={handleSubmitJugador}
          >
            Registrar Jugador
          </button>
        </div>
      )}

      {selectedOption === "Ingresar Partido" && (
        <div className="space-y-4">
          <h3 className="font-bold text-lg text-white">Ingresar Partido</h3>

          <select
            className="select select-error w-full text-lg shadow-xl"
            onChange={handleCategoriaChangePartido}
          >
            <option value="" disabled selected>
              Selecciona categoría
            </option>
            {categorias.map((categoria, index) => (
              <option key={index} value={categoria.idCategoria}>
                {categoria.categoria}
              </option>
            ))}
          </select>

          <select
            className="select select-error w-full text-lg shadow-xl"
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
            className="select select-error w-full text-lg shadow-xl"
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
            className="select select-error w-full text-lg shadow-xl"
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
          <label className="input input-bordered flex items-center gap-2">
            Fecha del juego:
            <input
              type="date"
              value={partidoData.fechaJuego}
              onChange={(e) =>
                setPartidoData({ ...partidoData, fechaJuego: e.target.value })
              }
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Hora de inicio:
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
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Jornada:
            <input
              type="number"
              placeholder="Jornada"
              value={partidoData.jornada}
              onChange={(e) =>
                setPartidoData({ ...partidoData, jornada: e.target.value })
              }
            />
          </label>
          <button
            className="btn bg-[#1A1A2E] text-white hover:bg-[#8B0000] glass"
            onClick={handleSubmitPartido}
          >
            Registrar Partido
          </button>
        </div>
      )}

      {selectedOption === "Registrar Resultado" && (
        <div className="space-y-4">
          <h3 className="font-bold text-lg text-white">Registrar Resultado</h3>

          <select
            className="select select-error w-full text-lg shadow-xl"
            onChange={handleCategoriaChangePartido}
          >
            <option value="" disabled selected>
              Selecciona categoría
            </option>
            {categorias.map((categoria, index) => (
              <option key={index} value={categoria.idCategoria}>
                {categoria.categoria}
              </option>
            ))}
          </select>

          <select
            className="select select-error w-full text-lg shadow-xl"
            value={resultadoData.idTorneo}
            onChange={handlePartidoChange}
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

          {resultadoData.idTorneo !== "" && (
            <div>
              <select
                className="select select-error w-full text-lg shadow-xl"
                onChange={(e) =>
                  setResultadoData({
                    ...resultadoData,
                    idPartido: e.target.value.split("-")[0],
                    idEquipoLocal: e.target.value.split("-")[1],
                    idEquipoVisita: e.target.value.split("-")[2],
                  })
                }
              >
                <option value="" disabled selected>
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
            <div className="space-y-4">
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path d="M.102 2.223a5.225 5.225 0 0 0 6.523 7.426l6.879 6.878a1.5 1.5 0 1 0 2.121-2.121l-6.878-6.879A5.225 5.225 0 0 0 2.222.102l1.415 1.415a2.5 2.5 0 0 1 2.657 4.116l-.643.643a2.5 2.5 0 1 1-3.536-3.536l-.643-.643a5.225 5.225 0 0 0-2.07 1.126z" />
                </svg>

                <input
                  type="number"
                  name="golesLocal"
                  placeholder="Goles equipo local"
                  value={resultadoData.golesLocal}
                  onChange={handleResultadoInputChange}
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path d="M.102 2.223a5.225 5.225 0 0 0 6.523 7.426l6.879 6.878a1.5 1.5 0 1 0 2.121-2.121l-6.878-6.879A5.225 5.225 0 0 0 2.222.102l1.415 1.415a2.5 2.5 0 0 1 2.657 4.116l-.643.643a2.5 2.5 0 1 1-3.536-3.536l-.643-.643a5.225 5.225 0 0 0-2.07 1.126z" />
                </svg>

                <input
                  type="number"
                  name="golesVisita"
                  placeholder="Goles equipo visitante"
                  value={resultadoData.golesVisita}
                  onChange={handleResultadoInputChange}
                />
              </label>
            </div>
          )}
          <button
            className="btn bg-[#1A1A2E] text-white hover:bg-[#8B0000] glass"
            onClick={handleSubmitResultado}
          >
            Registrar Resultado
          </button>
        </div>
      )}

      {selectedOption === "Registrar Goleo Individual" && (
        <div className="space-y-4">
          <h2 className="font-bold text-lg text-white">
            Registrar Goleo Individual
          </h2>

          <select
            onChange={handleCategoriaChangePartido}
            className="select select-error w-full text-lg shadow-xl"
          >
            <option value="" disabled selected>
              Selecciona categoría
            </option>
            {categorias.map((categoria, index) => (
              <option key={index} value={categoria.idCategoria}>
                {categoria.categoria}
              </option>
            ))}
          </select>

          <select
            value={resultadoData.idTorneo}
            className="select select-error w-full text-lg shadow-xl"
            onChange={handlePartidoChange}
          >
            <option value="" disabled selected>
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
                className="select select-error w-full text-lg shadow-xl"
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
                <option value="" disabled selected>
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
                className="select select-error w-full text-lg shadow-xl"
                onChange={(e) =>
                  setGoleoData({
                    ...goleoData,
                    equipoSeleccionado: e.target.value,
                  })
                }
              >
                <option value="" disabled selected>
                  Selecciona Equipo
                </option>
                <option value={goleoData.nombreEquipoLocal}>
                  {goleoData.nombreEquipoLocal}
                </option>
                <option value={goleoData.nombreEquipoVisita}>
                  {goleoData.nombreEquipoVisita}
                </option>
              </select>
            </div>
          )}
          {jugadoresGoleo.length > 0 && goleoData.idPartido !== "" &&(
            <div>
              <select
                className="select select-error w-full text-lg shadow-xl"
                onChange={(e) =>
                  setGoleoData({
                    ...goleoData,
                    idJugador: e.target.value.split("-")[0],
                    numeroJugador: e.target.value.split("-")[1],
                  })
                }
              >
                <option value="" disabled selected>
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
                  type="number"
                  name="goles"
                  placeholder="Goles del jugador"
                  onChange={handleGoleoInputChange}
                />
              </label>
            </div>
          )}
          <button
            className="btn bg-[#1A1A2E] text-white hover:bg-[#8B0000] glass"
            onClick={handleSubmitGoleo}
          >
            Registrar Goleo
          </button>
        </div>
      )}

      {selectedOption === "Registrar Goleo Total" && (
        <div className="space-y-4">
          <h2 className="font-bold text-lg text-white">
            Registrar Goleo Total
          </h2>

          <select
            onChange={handleCategoriaChangePartido}
            className="select select-error w-full text-lg shadow-xl"
          >
            <option value="" disabled selected>
              Selecciona categoría
            </option>
            {categorias.map((categoria, index) => (
              <option key={index} value={categoria.idCategoria}>
                {categoria.categoria}
              </option>
            ))}
          </select>

          <select
            className="select select-error w-full text-lg shadow-xl"
            value={resultadoData.idTorneo}
            onChange={handlePartidoChange}
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

          {goleoTotal.idTorneo !== "" && (
            <div>
              <select
                className="select select-error w-full text-lg shadow-xl"
                onChange={(e) =>
                  setGoleoTotal({
                    ...goleoTotal,
                    idPartido: e.target.value.split("-")[0],
                    idEquipoLocal: e.target.value.split("-")[1],
                    idEquipoVisita: e.target.value.split("-")[2],
                    nombreEquipoLocal: e.target.value.split("-")[3],
                    nombreEquipoVisita: e.target.value.split("-")[4],
                  })
                }
              >
                <option value="" disabled selected>
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
          {goleoTotal.idPartido !== "" && (
            <div>
              <select
                className="select select-error w-full text-lg shadow-xl"
                onChange={(e) =>
                  setGoleoTotal({
                    ...goleoTotal,
                    equipoSeleccionado: e.target.value,
                  })
                }
              >
                <option value="" disabled selected>
                  Selecciona Equipo
                </option>
                <option value={goleoTotal.nombreEquipoLocal}>
                  {goleoTotal.nombreEquipoLocal}
                </option>
                <option value={goleoTotal.nombreEquipoVisita}>
                  {goleoTotal.nombreEquipoVisita}
                </option>
              </select>
            </div>
          )}
          {goleoTotal.idEquipo !== "" && (
            <div className="space-y-4">
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path d="M.102 2.223a5.225 5.225 0 0 0 6.523 7.426l6.879 6.878a1.5 1.5 0 1 0 2.121-2.121l-6.878-6.879A5.225 5.225 0 0 0 2.222.102l1.415 1.415a2.5 2.5 0 0 1 2.657 4.116l-.643.643a2.5 2.5 0 1 1-3.536-3.536l-.643-.643a5.225 5.225 0 0 0-2.07 1.126z" />
                </svg>

                <input
                  type="number"
                  name="golesAnotados"
                  placeholder="Goles Anotados"
                  onChange={handleGoleoTotalInputChange}
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path d="M.102 2.223a5.225 5.225 0 0 0 6.523 7.426l6.879 6.878a1.5 1.5 0 1 0 2.121-2.121l-6.878-6.879A5.225 5.225 0 0 0 2.222.102l1.415 1.415a2.5 2.5 0 0 1 2.657 4.116l-.643.643a2.5 2.5 0 1 1-3.536-3.536l-.643-.643a5.225 5.225 0 0 0-2.07 1.126z" />
                </svg>

                <input
                  type="number"
                  name="golesRecibidos"
                  placeholder="Goles Recibidos"
                  onChange={handleGoleoTotalInputChange}
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path d="M.102 2.223a5.225 5.225 0 0 0 6.523 7.426l6.879 6.878a1.5 1.5 0 1 0 2.121-2.121l-6.878-6.879A5.225 5.225 0 0 0 2.222.102l1.415 1.415a2.5 2.5 0 0 1 2.657 4.116l-.643.643a2.5 2.5 0 1 1-3.536-3.536l-.643-.643a5.225 5.225 0 0 0-2.07 1.126z" />
                </svg>

                <input
                  type="number"
                  name="resultado"
                  placeholder="Resultado"
                  onChange={handleGoleoTotalInputChange}
                />
              </label>
            </div>
          )}
          <button
            className="btn bg-[#1A1A2E] text-white hover:bg-[#8B0000] glass"
            onClick={handleSubmitGoleoTotal}
          >
            Registrar Goleo Total
          </button>
        </div>
      )}
    </div>
  );
};

export default ModalLoad;
