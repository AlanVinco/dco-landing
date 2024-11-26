// src/components/Login.js
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/actions/loginSlice";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/dco-removebg-preview.png";
import { checkUserExists, setNewPassword } from "../redux/actions/resetSlice";

const Reset = () => {
  const [alias, setAlias] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error, success } = useSelector((state) => state.reset);

  const handleCheckUser = async () => {
    const result = await dispatch(checkUserExists(alias));
    if (result.meta.requestStatus === "fulfilled") {
      setStep(2);
    }
  };

  const handleSetPassword = async () => {
    const result = await dispatch(
      setNewPassword({ alias, contrasenia: password })
    );
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/login");
    }
  };

  return (
    <div className="hero min-h-screen hex-background bg-gray-100">
      <button
        className="fixed top-4 left-4 flex items-center justify-center w-10 h-10 bg-[#06938D] text-white rounded-full shadow-xl hover:bg-[#FD966F] transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105"
        onClick={() => navigate('/login')}
        aria-label="Regresar al inicio"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card bg-[#06938D] shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
        <div className="card bg-[#FD966F] shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
        <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
          <h1 className="text-xl font-bold mb-4 text-center text-[#06938D]">
            {step === 1
              ? "Restablecer Contraseña"
              : "Establecer Nueva Contraseña"}
          </h1>
          {status === "failed" && <p className="text-red-500">{error}</p>}
          {step === 1 && (
            <>
              <input
                type="text"
                placeholder="Usuario"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                className="w-full p-2 border rounded mb-4 text-black"
              />
              <button
                onClick={handleCheckUser}
                className="bg-[#06938D] w-full py-3 rounded-xl font-bold text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105"
                disabled={status === "loading"}
              >
                Verificar Usuario
              </button>
            </>
          )}
          {step === 2 && (
            <>
              <input
                type="text"
                placeholder="Usuario"
                value={alias}
                readOnly
                className="w-full p-2 border rounded mb-4 bg-gray-200 text-black"
              />
              <input
                type="password"
                placeholder="Nueva Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded mb-4 text-black"
              />
              <button
                onClick={handleSetPassword}
                className="bg-green-500 w-full py-3 rounded-xl font-bold text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105"
                disabled={status === "loading"}
              >
                Establecer Contraseña
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reset;
