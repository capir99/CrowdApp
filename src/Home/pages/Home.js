import "../../css/app.css";
import logo from "../../logo.PNG";
import React, { useState } from "react";
import ListaProductos from "../components/ListaProductos";
import Menu from "../components/Menu";
import Busqueda from "../components/Busqueda";

const Home = () => {
  return (
    <div className="container">
      <div className="top-image-container">
        <img className="logo-nana" src={logo} alt="" />
      </div>
      <p className="h5 mb-3 fw-normal">Transformamos la forma de ayudar</p>
      <div className="busqueda-container-wrapper">
        <Busqueda />
      </div>
      <div className="menu-container-wrapper d-lg-flex justify-content-center">
        <Menu />
      </div>
      <div className="d-lg-flex justify-content-center">
        <ListaProductos />
      </div>
    </div>
  );
};

export default Home;
