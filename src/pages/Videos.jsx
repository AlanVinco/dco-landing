import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos, insertVideo } from "../redux/actions/videosSlice";
import Modal from "../components/Modal";
import Alert from "../components/Alert";

const Videos = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const { data: videos, status, error } = useSelector((state) => state.videos);
  const [isModalOpen, setModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const showSuccessAlert = () => {
    setAlertMessage("El video se agregó correctamente.");
    setAlertType("success");
  };

  const showErrorAlert = () => {
    setAlertMessage("A ocurrido un error.");
    setAlertType("error");
  };

  const handleCloseAlert = () => {
    setAlertMessage(""); // Esto hará que la alerta se cierre
  };

  const handleRefresh = () => {
    dispatch(fetchVideos());
  };

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

    dispatch(insertVideo(newVideo))
      .then(() => {
        showSuccessAlert();
        handleRefresh(); // Refrescar después de agregar el video
      })
      .catch((error) => {
        showErrorAlert();
      });
  };

  return (
    <div className="animate__animated animate__jackInTheBox">
      <Alert
        message={alertMessage}
        type={alertType}
        duration={2000}
        onClose={handleCloseAlert}
      />
      <div className="hero-content flex-col lg:flex-row card glass">
        <div className="carousel carousel-vertical rounded-box h-96">
          {videos
            .filter(
              (video) =>
                video.video && video.video.startsWith("https://www.youtube.com")
            )
            .map((video, index) => (
              <LazyLoadIframe key={index} src={video.video} />
            ))}
        </div>
      </div>
      <h1 className="text-white">Acerca el mouse al video y usa la rueda del ratón para desplazarlos.</h1>

      {isAuthenticated && (
        <div className="mt-4">
          <button
            className="btn bg-[#1A1A2E] text-white hover:bg-[#8B0000] glass"
            onClick={() => setModalOpen(true)}
          >
            Agregar Nuevo Video
          </button>
        </div>
      )}

      {isModalOpen && (
        <Modal onClose={() => setModalOpen(false)} onSubmit={handleAddVideo} />
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
          className="lg:w-full aspect-video w-1/2"
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
