import { useState } from "react";

const Modal = ({ onClose, onSubmit }) => {
  const [nombre, setNombre] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  // Función para transformar la URL de YouTube al formato embed
  const transformYouTubeUrl = (url) => {
    const videoId = url.split("v=")[1];
    const ampersandPosition = videoId ? videoId.indexOf("&") : -1;
    if (ampersandPosition !== -1) {
      return `https://www.youtube.com/embed/${videoId.substring(
        0,
        ampersandPosition
      )}`;
    }
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const handleSubmit = () => {
    const transformedUrl = transformYouTubeUrl(videoUrl); // Transformar URL antes de enviar
    if (nombre != "" && videoUrl != "") {
      onSubmit(nombre, transformedUrl); // Enviar los datos transformados al componente Videos
    }
    onClose(); // Cerrar el modal después de agregar el video
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#8B0000] p-4 max-w-md w-full shadow-xl rounded-box">
        <h2 className="text-xl font-bold mb-4 text-white">
          Agregar Nuevo Video
        </h2>

        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M19.615 3.184c-.853-.32-2.777-.441-5.678-.441-2.901 0-4.825.121-5.678.441-1.086.408-1.93 1.245-2.337 2.338-.319.853-.44 2.777-.44 5.678s.121 4.825.44 5.678c.407 1.086 1.245 1.93 2.337 2.337.853.32 2.777.441 5.678.441 2.901 0 4.825-.121 5.678-.441 1.086-.408 1.93-1.245 2.338-2.337.319-.853.441-2.777.441-5.678s-.122-4.825-.441-5.678c-.408-1.086-1.245-1.93-2.338-2.338ZM10 15.315V8.685L15.01 12l-5.01 3.315Z" />
          </svg>

          <input
            value={nombre}
            type="text"
            className="grow"
            placeholder="Nombre del video"
            onChange={(e) => setNombre(e.target.value)}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 my-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M19.615 3.184c-.853-.32-2.777-.441-5.678-.441-2.901 0-4.825.121-5.678.441-1.086.408-1.93 1.245-2.337 2.338-.319.853-.44 2.777-.44 5.678s.121 4.825.44 5.678c.407 1.086 1.245 1.93 2.337 2.337.853.32 2.777.441 5.678.441 2.901 0 4.825-.121 5.678-.441 1.086-.408 1.93-1.245 2.338-2.337.319-.853.441-2.777.441-5.678s-.122-4.825-.441-5.678c-.408-1.086-1.245-1.93-2.338-2.338ZM10 15.315V8.685L15.01 12l-5.01 3.315Z" />
          </svg>

          <input
            type="text"
            value={videoUrl}
            className="grow"
            placeholder="Url del video"
            onChange={(e) => setVideoUrl(e.target.value)}
          />
        </label>
        <div className="flex justify-end space-x-2">
          <button className="btn btn-warning" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="btn bg-[#1A1A2E] text-white hover:bg-[#8B0000] glass"
            onClick={handleSubmit}
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
