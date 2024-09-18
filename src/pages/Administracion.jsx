import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "../redux/actions/videosSlice";

function Administracion() {
  const dispatch = useDispatch();
  const {
    data: videos,
    status,
    error,
  } = useSelector((state) => state.videos);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchVideos()); // Despachar la acción para obtener los videos
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <div className="text-center">Cargando...</div>;
  }

  if (status === "failed") {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <div className="hero-content flex-col lg:flex-row card glass">
        <div className="text-white">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr className="text-[#06938D] font-bold text-base">
                  <th></th>
                  <th>Nombre</th>
                  <th>Categoria</th>
                  <th>Torneos</th>
                </tr>
              </thead>
              <tbody>
                {videos.map((equipo, index) => (
                  <tr key={index} className="p-2 border-b last:border-none">
                    <th>1</th>
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

export default Administracion;