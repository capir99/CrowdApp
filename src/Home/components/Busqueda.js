import React from "react";
import search_logo from "../../img/icons/search.png";

const Busqueda = ({ onSearch }) => {
  // const [searchText, setSearchText] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;
    // setSearchText(value);
    onSearch(value);
  };

  return (
    <div className="busqueda-container">
      <img src={search_logo} alt="Icono de búsqueda" className="search-icon" />
      <input
        type="text"
        placeholder="Buscar..."
        className="search-input"
        // value={searchText}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Busqueda;
