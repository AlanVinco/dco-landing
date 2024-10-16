import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../redux/actions/authSlice";
import { fetchVisitas } from "../redux/actions/visitasSlice";
import VisitCount from "./VisitCount";
import { registerGuestConnection } from '../redux/actions/loginSlice';

import logo from "../assets/dco-hd-sinfondo.png";

const Home = () => {
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
      navigate("/dashboard");
    } else {
      dispatch(logout());
      // navigate("/login");
    }
    dispatch(fetchVisitas());
  }, [dispatch, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    registerGuestConnection()
  }, [])
  

  return (
    <div className="bg-[#06938D]">
      <div className="">
        <div className="flex justify-center">
          <img src={logo} alt="logo" className="w-64" />
        </div>
      </div>

      <div className="navbar bg-[#06938D]">
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
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/torneos">Torneos</Link>
            </li>
            <li>
              <Link to="/patrocinadores">Patrocinadores</Link>
            </li>
            <li>
              <Link to="/servicios">Servicios</Link>
            </li>
            <li>
              <Link to="/videos">Videos</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="btn btn-outline btn-accent bg-[#F3F4F6]"
            >
              Cerrar Sesión
            </button>
          ) : (
            <Link
              to="/login"
              className="btn btn-outline btn-accent bg-[#F3F4F6]"
            >
              Iniciar Sesión
            </Link>
          )}
        </div>
      </div>

      <div className="hero bg-[url(https://wallpaperaccess.com/full/7488635.jpg)] bg-cover bg-center min-h-screen">
        {/* <div className="hero-content flex-col lg:flex-row card glass">
          <img
            src="https://i.pinimg.com/564x/ba/89/0f/ba890f0fb64a8795fc5135b48c785c2e.jpg"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div className="text-white">
            <h1 className="text-5xl font-bold">Cristiano Ronaldo</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn btn-accent">Equipo</button>
          </div>
        </div> */}
        <Outlet />
      </div>
      {/* Footer*/}
      <footer className=" text-black py-4 flex justify-center items-center ">
        <div>
          <VisitCount num={visitas} />
        </div>
      </footer>
    </div>
  );
};

export default Home;
