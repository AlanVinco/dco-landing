// src/components/Login.js
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/actions/loginSlice";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/dco-removebg-preview.png";

const Login = () => {
  const [alias, setAlias] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.login);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ alias, contrasenia })).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/dashboard"); // Redirige si el login es exitoso
      }
    });
  };

  return (
    <div className="hero min-h-screen hex-background bg-gray-100">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold text-gray-700">
            Pasión por el deporte.
          </h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card bg-[#06938D] shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
          <div className="card bg-[#FD966F] shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
          <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
            <div className="flex justify-center">
              <img src={logo} alt="" className="rounded-full" />
            </div>
            <form onSubmit={handleLogin} className="mt-10">
              <div>
                <label className="input input-bordered flex items-center gap-2 text-black">
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
                    value={alias}
                    onChange={(e) => setAlias(e.target.value)}
                    placeholder="Usuario:"
                  />
                </label>
              </div>

              <div className="mt-7">
                <label className="input input-bordered flex items-center gap-2 text-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    type="password"
                    value={contrasenia}
                    onChange={(e) => setContrasenia(e.target.value)}
                    placeholder="Contraseña:"
                  />
                </label>
              </div>

              <div className="mt-7">
                <button
                  type="submit"
                  className="bg-[#06938D] w-full py-3 rounded-xl font-bold text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? (
                    <span className="loading loading-infinity loading-lg"></span>
                  ) : (
                    "Ingresar"
                  )}
                </button>
              </div>
            </form>

            {error && <p className="mt-3 text-red-500">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
