import React from "react";
import search_logo from "../../img/icons/search.png";

const Busqueda = () => {
  return (
    <div className="busqueda-container">
      <img src={search_logo} alt="Icono de búsqueda" className="search-icon" />
      <input type="text" placeholder="Buscar..." className="search-input" />
    </div>
  );
};

export default Busqueda;
