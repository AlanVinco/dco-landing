import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { obtenerNoticiasLiga } from "../redux/actions/noticiasSlice";
import logo from "../assets/dco-hd-sinfondo.png";

const Home = () => {
  const dispatch = useDispatch();
  const { noticias, status, error } = useSelector((state) => state.noticias);

  // Llamar al thunk para obtener las noticias cuando el componente se monta
  useEffect(() => {
    if (status === "idle") {
      dispatch(obtenerNoticiasLiga());
    }
  }, [dispatch, status]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-white">
        Noticias de la Liga
      </h1>

      {status === "loading" && (
        <div className="text-center">
          <span className="loading loading-infinity loading-lg text-white"></span>
        </div>
      )}

      {status === "failed" && (
        <div className="text-center text-red-500 text-2xl">
          <h1>Error al cargar las noticias.</h1>
          <label className="swap swap-flip text-9xl">
            {/* this hidden checkbox controls the state */}
            <input type="checkbox" />
            <div className="swap-on">⚠</div>
            <div className="swap-off">❌</div>
          </label>
        </div>
      )}

      {status === "succeeded" && (
        <div className="flex justify-center text-white animate__animated animate__flip">
          <div className="card glass w-96">
            <figure>
              <img src={logo} alt="car!" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{noticias[0].nombre}</h2>
              <p>{noticias[0].descripcion}</p>
              <div className="card-actions justify-end">
                <button className="">
                  Fecha:{" "}
                  {new Date(noticias[0].fechaInsert).toLocaleDateString()}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
