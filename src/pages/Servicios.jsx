import React from "react";

const Servicios = () => {
  return (
    <div>
      <div className="card lg:card-side shadow-xl glass animate__animated animate__fadeInTopLeft">
        <iframe
          className="w-full aspect-video"
          src="https://www.youtube.com/embed/GHnQK3S2q-I?si=Y07v5fhE9ycipHYn"
          title={`video seguro médico`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <div className="card-body">
          <img className="object-cover w-[500px]" src="https://www.loginliga.somee.com/img/seguro%20medico.jpg" alt="Album" />
        </div>
      </div>
    </div>
  );
};

export default Servicios;
