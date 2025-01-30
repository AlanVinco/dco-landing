import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../redux/actions/authSlice";
import { fetchVisitas } from "../redux/actions/visitasSlice";
import { registerGuestConnection } from "../redux/actions/loginSlice";

import logo from "../assets/dco-logo-final-no-bg.png";

const Home = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const visitas = useSelector((state) =>
    state.visitas.visitas.length > 0 ? state.visitas.visitas[0].idConexion : 0
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

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
    registerGuestConnection();
  }, []);

  return (
    <div className="bg-[#1A1A2E]">
      <div className="">
        <div className="flex justify-center">
          <img src={logo} alt="logo" className="w-64" />
        </div>
      </div>

      <div className="navbar bg-[#8B0000]">
      <div className="navbar-start">
      <div className="dropdown">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost lg:hidden text-white"
          onClick={toggleDropdown}
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
        {isDropdownOpen && (
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-[#8B0000] text-white rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/" onClick={closeDropdown}>Inicio</Link>
            </li>
            <li>
              <Link to="/torneos" onClick={closeDropdown}>Torneos</Link>
            </li>
            <li>
              <Link to="/patrocinadores" onClick={closeDropdown}>Patrocinadores</Link>
            </li>
            <li>
              <Link to="/servicios" onClick={closeDropdown}>Servicios</Link>
            </li>
            <li>
              <Link to="/videos" onClick={closeDropdown}>Videos</Link>
            </li>
          </ul>
        )}
      </div>
      </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-white text-lg">
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
              className="btn bg-[#1A1A2E] text-white hover:bg-[#8B0000] glass text-xl"
            >
              Cerrar Sesión
            </button>
          ) : (
            <Link
              to="/login"
              className="btn bg-[#1A1A2E] text-white hover:bg-[#8B0000] glass text-xl"
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

export default Home;
