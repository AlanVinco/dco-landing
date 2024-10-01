// src/components/Login.js
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/actions/loginSlice';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/dco-removebg-preview.png';

const Login = () => {
  const [alias, setAlias] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.login);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ alias, contrasenia })).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        navigate('/dashboard/home'); // Redirige si el login es exitoso
      }
    });
  };

  return (
    <div className="hero min-h-screen hex-background bg-gray-100">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold text-gray-700">Pasión por el deporte.</h1>
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
                <input
                  type="text"
                  value={alias}
                  onChange={(e) => setAlias(e.target.value)}
                  placeholder="Usuario:"
                  className="p-2 placeholder-gray-500 text-gray-700 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                />
              </div>

              <div className="mt-7">
                <input
                  type="password"
                  value={contrasenia}
                  onChange={(e) => setContrasenia(e.target.value)}
                  placeholder="Contraseña:"
                  className="p-2 placeholder-gray-500 text-gray-700 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                />
              </div>

              <div className="mt-7">
                <button
                  type="submit"
                  className="bg-[#06938D] w-full py-3 rounded-xl font-bold text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Cargando...' : 'Ingresar'}
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
