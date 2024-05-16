import ima1 from "../../img/prod5.PNG";
import sombrero from "../../img/sombrero.png";
import plus from "../../img/icons/plus.png";
import minus from "../../img/icons/minus.png";
import heart from "../../img/icons/heart_red.png";
import heart2 from "../../img/icons/heart_red2.png";
import React, { useState } from "react";

const Detail = () => {
  const producto = {
    id: 1,
    imag: ima1,
    name: "Lucia, Sara y Antonio",
    title: "Grupo Alcantara",
    location: "Plaza Mayor",
    likes: "34",
    text1:
      "Cada moneda arrojada en su sombrero es un aplauso, un reconocimiento a su talento y un gesto de apoyo",
    details:
      "Hoy, mientras paseas por la calle y escuchas la melodía de Carlos, considera unirte a su audiencia efimera y ser parte de su historia. Tu ofrenda no solo alimenta su pasión, sino que alimenta a su familia",
    helpways: "",
  };

  const [activeTab, setActiveTab] = useState("tab1"); // Estado para controlar la pestaña activa

  const handleTabClick = (tab) => {
    setActiveTab(tab); // Actualiza el estado al hacer clic en una pestaña
  };

  return (
    <div>
      <p className="h3 mb-3 fw-normal">Lo has visto en {producto.location}</p>
      <img src={producto.imag} alt="Location Icon" className="circular-image" />

      <div className="container-detalle">
        <div className="name-detalle">
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
        <div className="control-aporte">
          <img src={plus} alt="" className="icon" />
          <img src={sombrero} alt="" className="sombrero-image" />
          <img src={minus} alt="" className="icon" />
        </div>
      </div>

      <p className="h5 mb-3 fw-normal">{producto.text1}</p>
      <div className="tabs-container">
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
      </div>
    </div>
  );
};
export default Detail;
