import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { obtenerNoticiasLiga  } from "../redux/actions/noticiasSlice";


const Home = () => {
  const dispatch = useDispatch();
  const { noticias, status, error } = useSelector((state) => state.noticias);

  // Llamar al thunk para obtener las noticias cuando el componente se monta
  useEffect(() => {
    if (status === 'idle') {
      dispatch(obtenerNoticiasLiga());
    }
  }, [dispatch, status]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-white">Noticias de la Liga</h1>

      {status === 'loading' && (
        <div className="text-center">
          <p className="text-lg">Cargando noticias...</p>
        </div>
      )}

      {status === 'failed' && (
        <div className="text-center text-red-500">
          <p>Error al cargar las noticias: {error}</p>
        </div>
      )}

      {status === 'succeeded' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {noticias.map((noticia) => (
            <div key={noticia.idNoticia} className="p-6 bg-white shadow-md rounded-md">
              <h2 className="text-xl font-bold mb-2 text-white">{noticia.nombre}</h2>
              <p className="text-gray-700 mb-4">{noticia.descripcion}</p>
              <p className="text-sm text-gray-500">Fecha: {new Date(noticia.fechaInsert).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
