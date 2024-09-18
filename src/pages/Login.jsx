import logo from '../assets/dco-removebg-preview.png';
import { useNavigate } from "react-router-dom";

import '../index.css'

const Login = () => {

  const navigate = useNavigate();
  
  const handleLogin = () => {
    // Aquí iría la lógica de autenticación
    localStorage.setItem("authToken", "fake-token");
    console.log("se guardo?")
    navigate("/"); // Redirige a Home después de iniciar sesión
};

  return (
    <div className="hero min-h-screen hex-background bg-gray-100">
      <div className="hero-content flex-col lg:flex-row-reverse">
        {/* <img src={logo} className="w-32 h-32"/> */}
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold text-gray-700">Pasión por el deporte.</h1>
          {/* <p className="py-6">
            
          </p> */}
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card bg-[#06938D] shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
          <div className="card bg-[#FD966F] shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
          <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
            <label className="block mt-3 text-sm text-gray-700 text-center font-semibold">
            </label>
            <div className="flex justify-center">
                <img src={logo} alt="" className="rounded-full" />
            </div>
            <form method="#" action="#" className="mt-10">
              <div>
                <input
                  type="email"
                  placeholder="Usuario:"
                  className="p-2 placeholder-gray-500 text-gray-700 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                />
              </div>

              <div className="mt-7">
                <input
                  type="password"
                  placeholder="Contraseña:"
                  className="p-2 placeholder-gray-500 text-gray-700 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                />
              </div>

              <div className="mt-7 flex">
              </div>

              <div className="mt-7">
                <button onClick={handleLogin} className="bg-[#06938D] w-full py-3 rounded-xl font-bold text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                  Ingresar
                </button>
              </div>

              <div className="mt-7">
                <div className="flex justify-center items-center">
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
