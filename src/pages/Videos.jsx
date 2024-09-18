import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "../redux/actions/videosSlice";

const Videos = () => {
  const dispatch = useDispatch();
  const { data: videos, status, error } = useSelector((state) => state.videos);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchVideos()); // Despachar la acción para obtener los videos
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <div className="text-center">Cargando...</div>;
  }

  if (status === "failed") {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  // Filtrar los videos para que solo aparezcan los que empiezan con 'https://www.youtube.com'
  const videosFiltrados = videos.filter(video => video.video.startsWith("https://www.youtube.com"));

  return (
    <div>
      <div className="hero-content flex-col lg:flex-row card glass">
        <div className="carousel carousel-vertical rounded-box h-96">
          {videosFiltrados.map((video, index) => (
            <LazyLoadIframe key={index} src={video.video} />
          ))}
        </div>
      </div>
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
            observer.disconnect(); // Deja de observar una vez que se ha cargado el iframe
          }
        });
      },
      { threshold: 0.1 } // Ajusta el umbral según sea necesario
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
