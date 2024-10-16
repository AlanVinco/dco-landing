import 'animate.css';
import logo from "../assets/cafe.jpg";


const Patrocinadores = () => {
  return (
    <div>
      <div className="card lg:card-side shadow-xl glass animate__animated animate__fadeInTopRight">
        <iframe
          className="w-full aspect-video"
          src="https://www.youtube.com/embed/5guKXzwQhDQ?si=6eMsNWRADNpx9nwd"
          title={`video-Café coronado`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <div className="card-body">
          <img className="object-cover w-[500px]" src={logo} alt="cafe" />
        </div>
      </div>
    </div>
  );
};

export default Patrocinadores;
