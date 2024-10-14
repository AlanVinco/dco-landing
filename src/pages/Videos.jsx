import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos, insertVideo } from "../redux/actions/videosSlice";
import Modal from "../components/Modal";

const Videos = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const { data: videos, status, error } = useSelector((state) => state.videos);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchVideos());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <div className="text-center">Cargando...</div>;
  }

  if (status === "failed") {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  const handleAddVideo = (nombre, videoUrl) => {
    const newVideo = {
      nombre: nombre,
      video: videoUrl,
    };
    dispatch(insertVideo(newVideo)); // Despacha la acción para agregar un nuevo video
    setModalOpen(false); // Cierra el modal después de insertar
  };

  return (
    <div>
      <div className="hero-content flex-col lg:flex-row card glass">
        <div className="carousel carousel-vertical rounded-box h-96">
          {videos
            .filter((video) =>
              video.video.startsWith("https://www.youtube.com")
            )
            .map((video, index) => (
              <LazyLoadIframe key={index} src={video.video} />
            ))}
        </div>
      </div>

      {isAuthenticated && (
        <div className="mt-4">
          <button
            className="btn btn-primary"
            onClick={() => setModalOpen(true)}
          >
            Agregar Nuevo Video
          </button>
        </div>
      )}

      {isModalOpen && (
        <Modal
          onClose={() => setModalOpen(false)}
          onSubmit={handleAddVideo}
          fetchTable={fetchVideos()}
        />
      )}
    </div>
  );
};

// Componente para manejar el lazy loading del iframe
const LazyLoadIframe = ({ src }) => {
  const iframeRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (iframeRef.current) {
      observer.observe(iframeRef.current);
    }

    return () => {
      if (iframeRef.current) {
        observer.unobserve(iframeRef.current);
      }
    };
  }, []);

  return (
    <div className="carousel-item h-full" ref={iframeRef}>
      {isVisible ? (
        <iframe
          className="w-full aspect-video"
          src={src}
          title={`video-${src}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <div className="w-full aspect-video bg-gray-200 flex items-center justify-center">
          <p className="text-gray-500">Cargando video...</p>
        </div>
      )}
    </div>
  );
};

export default Videos;
