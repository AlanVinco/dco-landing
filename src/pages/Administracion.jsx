import { useState } from "react";
import { useDispatch } from "react-redux";
import ModalLoad from "../components/ModalLoad";
import { setModalContent } from "../redux/actions/modalSlice"; // Importamos la acción del slice


const AdminSelector = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const dispatch = useDispatch();

  const handleOptionChange = (event) => {
    const option = event.target.value;
    setSelectedOption(option);
    // Dispatch para mostrar el modal con la categoría seleccionada
    dispatch(setModalContent(option));
  };

  return (
    <div className="animate__animated animate__lightSpeedInLeft">
      <div className="card bg-slate-600">
        <div className="card-body">
          <ul className="menu menu-vertical lg:menu-horizontal bg-[#8B0000] rounded-box">
            <li>
              <button
                className="btn bg-[#1A1A2E] text-white hover:bg-[#8B0000] glass mr-1 mb-1"
                onClick={(event) => {
                  document.getElementById("my_modal_3").showModal();
                  handleOptionChange(event);
                }}
                value={"Registrar Categoría"}
              >
                Registrar Categoría
              </button>
            </li>
            <li>
              <button
                className="btn bg-[#1A1A2E] text-white hover:bg-[#8B0000] glass mr-1 mb-1"
                onClick={(event) => {
                  document.getElementById("my_modal_3").showModal();
                  handleOptionChange(event);
                }}
                value={"Registrar Torneo"}
              >
                Registrar Torneo
              </button>
            </li>
            <li>
              <button
                className="btn bg-[#1A1A2E] text-white hover:bg-[#8B0000] glass mr-1 mb-1"
                onClick={(event) => {
                  document.getElementById("my_modal_3").showModal();
                  handleOptionChange(event);
                }}
                value={"Registrar Equipo"}
              >
                Registrar Equipo
              </button>
            </li>
            <li>
              <button
                className="btn bg-[#1A1A2E] text-white hover:bg-[#8B0000] glass mr-1 mb-1"
                onClick={(event) => {
                  document.getElementById("my_modal_3").showModal();
                  handleOptionChange(event);
                }}
                value={"Registrar Jugador"}
              >
                Registrar Jugador
              </button>
            </li>
            <li>
              <button
                className="btn bg-[#1A1A2E] text-white hover:bg-[#8B0000] glass mr-1 mb-1"
                onClick={(event) => {
                  document.getElementById("my_modal_3").showModal();
                  handleOptionChange(event);
                }}
                value={"Ingresar Partido"}
              >
                Programar Juego
              </button>
            </li>
            <li>
              <button
                className="btn bg-[#1A1A2E] text-white hover:bg-[#8B0000] glass mr-1 mb-1"
                onClick={(event) => {
                  document.getElementById("my_modal_3").showModal();
                  handleOptionChange(event);
                }}
                value={"Registrar Resultado"}
              >
                Registrar Resultado
              </button>
            </li>
            <li>
              <button
                className="btn bg-[#1A1A2E] text-white hover:bg-[#8B0000] glass mr-1 mb-1"
                onClick={(event) => {
                  document.getElementById("my_modal_3").showModal();
                  handleOptionChange(event);
                }}
                value={"Registrar Goleo Individual"}
              >
                Registrar Goleo Individual
              </button>
            </li>
          </ul>
        </div>
      </div>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box glass">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white">
              ✕
            </button>
          </form>
          {/* Modal */}
          <ModalLoad selectedOption={selectedOption} />
        </div>
      </dialog>
    </div>
  );
};

export default AdminSelector;
