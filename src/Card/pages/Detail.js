import BotonApoyo from "../components/BotonApoyo";
// import like from "../../img/like.png";
import plus from "../../img/icons/plus.png";
import minus from "../../img/icons/minus.png";
import heart from "../../img/icons/heart_red.png";
import heart2 from "../../img/icons/heart_red2.png";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_live_51PYebbDujtx63ft0LDiJHsQgIzgcNe4prgZOqYJvrfzOTj2oFONXzUvspklEXY2XYlwnL4ImsFqm3LJvfOqu8UZM00XaMA3eBl"
);

const Detail = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState([]);
  const [amount, setAmount] = useState(5);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:3001/api/products/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducto(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error state or show a message to the user
      }
    }
    fetchData();
  }, [id]);

  // Lógica para incrementar el valor del aporte
  const handlePlusClick = () => {
    setAmount((prevAmount) => prevAmount + 1);
  };

  // Lógica para decrementar el valor del aporte
  const handleMinusClick = () => {
    if (amount > 5) {
      setAmount((prevAmount) => prevAmount - 1);
    }
  };

  // Estado para controlar la pestaña activa
  const [activeTab, setActiveTab] = useState("tab1");

  // Actualiza el estado al hacer clic en una pestaña
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <p className="h4 mb-3 fw-normal d-flex flex-column justify-content-center align-items-center">
        Lo has visto en {producto.location}
      </p>
      <img
        src={`${process.env.PUBLIC_URL}/img/${producto.imag}`}
        alt="Location Icon"
        className="circular-image"
      />

      <div className="container-detalle row">
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center name-detalle">
          <p className="text-detalle-name">{producto.name}</p>
          <p className="text-detalle-title">"{producto.title}"</p>
          <div className="control-rankin">
            <img src={heart} alt="" className="control-rankin-heart" />
            <img src={heart} alt="" className="control-rankin-heart" />
            <img src={heart} alt="" className="control-rankin-heart" />
            <img src={heart} alt="" className="control-rankin-heart" />
            <img src={heart2} alt="" className="control-rankin-heart" />
            <p className="text-detalle-name"> {producto.likes}M</p>
          </div>
        </div>
        <div className="col-md-4 control-aporte ">
          <button
            className="icon-button circular-button control-aporte-item"
            onClick={handlePlusClick}
          >
            {/* <img src={plus} alt="plus" className="iconAmount" /> */}
            <div className="amount-display">+</div>
          </button>
          <div className="control-aporte-item">
            {/* <img src={sombrero} alt="" className="sombrero-image" /> */}
            <div className="amount-display">{amount} €</div>
          </div>
          <button
            className="icon-button circular-button control-aporte-item"
            onClick={handleMinusClick}
          >
            {/* <img src={minus} alt="" className="iconAmount" /> */}
            <div className="amount-display">-</div>
          </button>
        </div>
      </div>

      <p className="h4 mb-3 fw-normal">{producto.invitation}</p>
      <div className="tabs-container d-flex flex-column justify-content-center">
        <div className="tabs">
          <div
            className={`tab ${activeTab === "tab1" ? "active" : ""}`}
            onClick={() => handleTabClick("tab1")}
          >
            Detalles
          </div>
          <div
            className={`tab ${activeTab === "tab2" ? "active" : ""}`}
            onClick={() => handleTabClick("tab2")}
          >
            Formas de ayudar
          </div>
        </div>

        <div className="tab-content">
          {activeTab === "tab1" && <p>{producto.details}</p>}
          {activeTab === "tab2" && (
            <p>Contenido de la pestaña "Formas de ayudar"</p>
          )}
        </div>

        <div className="mt-4">
          <Elements stripe={stripePromise}>
            <BotonApoyo producto={producto} />
          </Elements>
        </div>
      </div>
    </div>
  );
};
export default Detail;
