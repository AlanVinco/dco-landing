import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../redux/actions/authSlice";
import { fetchVisitas } from "../redux/actions/visitasSlice";

import logo from "../assets/dco-logo-final-no-bg.png";

const DashboardLayout = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const visitas = useSelector((state) =>
    state.visitas.visitas.length > 0 ? state.visitas.visitas[0].idConexion : 0
  );

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      dispatch(login());
      // navigate("/dashboard");
    } else {
      dispatch(logout());
      navigate("/login");
    }
    dispatch(fetchVisitas());
  }, [dispatch, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="bg-[#1A1A2E]">
      <div className="">
        <div className="flex justify-center">
          <img src={logo} alt="logo" className="w-64" />
        </div>
      </div>

      <div className="navbar bg-[#8B0000] shadow-xl rounded-box">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden text-white text-xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-[#06938D] text-white rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Inicio</a>
              </li>
              <li>
                <details>
                  <summary>Torneos</summary>
                  <ul className="p-2 bg-[#06938D]">
                    <li>
                      <a>Torneo</a>
                    </li>
                    <li>
                      <a>Torneo</a>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <details>
                  <summary>Equipos</summary>
                  <ul className="p-2 bg-[#06938D]">
                    <li>
                      <a>Equipo</a>
                    </li>
                    <li>
                      <a>Equipo</a>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <a>Administración</a>
              </li>
              <li>
                <a>Correciónes</a>
              </li>
              <li>
                <a>Patrocinadores</a>
              </li>
              <li>
                <a>Servicios</a>
              </li>
              <li>
                <a>Videos</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-white">
            <li>
              <Link to="/dashboard">Inicio</Link>
            </li>
            <li>
              {/* <details>
                <summary>Torneos</summary>
                <ul className="p-2 bg-[#06938D]">
                  <li>
                    <a>Torneo</a>
                  </li>
                  <li>
                    <a>Torneo</a>
                  </li>
                </ul>
              </details> */}
              <Link to="/dashboard/torneos">Torneos</Link>
            </li>
            <li>
              <Link to="/dashboard/equipos">Equipos</Link>
            </li>
            <li>
              <Link to="/dashboard/administracion">Administración</Link>
            </li>
            <li>
              <Link to="/dashboard/correciones">Correciónes</Link>
            </li>
            <li>
              <Link to="/dashboard/patrocinadores">Patrocinadores</Link>
            </li>
            <li>
              <Link to="/dashboard/servicios">Servicios</Link>
            </li>
            <li>
              <Link to="/dashboard/videos">Videos</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="btn bg-[#1A1A2E] text-white hover:bg-[#8B0000] glass"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M10 0a2 2 0 0 1 2 2v4.5a.5.5 0 0 1-1 0V2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-4.5a.5.5 0 0 1 1 0V14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h8z" />
                <path d="M16 8a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5z" />
                <path d="M13.354 10.854a.5.5 0 0 1-.708-.708l1.647-1.647-1.647-1.647a.5.5 0 1 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2z" />
              </svg>
              Cerrar Sesión
            </button>
          ) : (
            <Link
              to="/login"
              className="btn bg-[#1A1A2E] text-white hover:bg-[#8B0000] glass"
            >
              Iniciar Sesión
            </Link>
          )}
        </div>
      </div>

      <div className="hex-main-background hero bg-gradient-to-t from-[#1A1A2E] from-10% via-[#003366] via-30% to-[#1A1A2E] to-90% bg-cover bg-center min-h-screen">
        <Outlet />
      </div>
      {/* Footer*/}
      <footer className=" text-black py-4 flex justify-center items-center bg-[#8B0000] rounded-t-box shadow-xl">
        <div className="stats shadow-xl rounded-box card glass ">
          <div className="stat">
            <div className="stat-figure text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5z"
                ></path>
              </svg>
            </div>
            <div className="stat-title text-white">Número de visitas:</div>
            <div className="stat-value text-white">{visitas}</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;
