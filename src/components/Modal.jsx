import { useState } from 'react';

const Modal = ({ onClose, onSubmit }) => {
  const [nombre, setNombre] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  // Función para transformar la URL de YouTube al formato embed
  const transformYouTubeUrl = (url) => {
    const videoId = url.split('v=')[1];
    const ampersandPosition = videoId ? videoId.indexOf('&') : -1;
    if (ampersandPosition !== -1) {
      return `https://www.youtube.com/embed/${videoId.substring(0, ampersandPosition)}`;
    }
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const handleSubmit = () => {
    const transformedUrl = transformYouTubeUrl(videoUrl); // Transformar URL antes de enviar
    onSubmit(nombre, transformedUrl); // Enviar los datos transformados al componente Videos
    onClose(); // Cerrar el modal después de agregar el video
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Agregar Nuevo Video</h2>

        <label className="block mb-2">
          Nombre del Video:
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </label>

        <label className="block mb-4">
          URL del Video:
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
        </label>

        <div className="flex justify-end space-x-2">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
