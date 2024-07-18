import "../../css/app.css";
import logo from "../../logo.PNG";
import React, { useState, useEffect } from "react";
import ListaProductos from "../components/ListaProductos";
import Menu from "../components/Menu";
import Busqueda from "../components/Busqueda";

const Home = () => {
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [, setSearchTerm] = useState("");
 


  // Función para cargar todos los productos iniciales
  useEffect(() => {
    async function fetchData() {
      try {
        const config = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await fetch(
          "http://localhost:3001/api/products/list",
          config
        );
        const data = await response.json();
        if (data) {
          setProductos(data);
          setFilteredProductos(data); // Inicialmente mostrar todos los productos
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  // Función para manejar cambios en el término de búsqueda
  const handleSearch = async (searchTerm) => {
    setSearchTerm(searchTerm);
    // Si el término de búsqueda está vacío, no hacer la solicitud HTTP
    if (searchTerm.trim() === "") {
      setFilteredProductos(productos);
      return;
    }
    try {
      const config = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        `http://localhost:3001/api/products/search/${searchTerm}`,
        config
      );
      const data = await response.json();
      if (data) {
        setFilteredProductos(data); // Actualizar productos filtrados según la búsqueda
      }
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  // Función para manejar filtro por categoria
  const handleCategorySearch = async (setSearchcategory) => {
    console.log(setSearchcategory);
    try {
      const config = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        `http://localhost:3001/api/products/searchCategory/${setSearchcategory}`,
        config
      );
      const data = await response.json();
      if (data) {
        setFilteredProductos(data); // Actualizar productos filtrados según la búsqueda
      }
    } catch (error) {
      console.error("Error searching category products:", error);
    }
  };

  return (
    <div className="home-container">
      <div className="top-image-container">
        <img className="logo-nana" src={logo} alt="" />
      </div>
      <p className="h5 mb-3 fw-normal">Transformamos la forma de ayudar</p>
      <div className="busqueda-container-wrapper">
        <Busqueda onSearch={handleSearch} />
      </div>
      <div className="menu-container-wrapper d-lg-flex justify-content-center">
        <Menu onSearch={handleCategorySearch} />
      </div>
      <div className="d-lg-flex justify-content-center">
        <ListaProductos
          productos={filteredProductos}
          setProductos={setProductos}
        />
      </div>
    </div>
  );
};

export default Home;
