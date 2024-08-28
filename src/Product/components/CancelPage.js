import React, { useState } from "react";
import cancelado from "../../img/icons/pagoExitoso.png";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../css/success.css";

const CancelPage = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  if (loading) {
    return <div>Cargando...</div>;
  }

  const handleClick = () => {
    const storedUrl = localStorage.getItem("lastUrl");
    // Extraer la parte relativa de la URL
    const relativeUrl = new URL(storedUrl).pathname + new URL(storedUrl).search;
    // Redirige a la URL almacenada
    navigate(relativeUrl);
  };

  return (
    <div className="success-container">
      <h1>{error ? "Error" : "Pago Cancelado"}</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <div>
          <p>La operación ha sido cancelada.</p>
          <img src={cancelado} alt="cancelado" />
          <div>
            <Button
              variant="primary"
              onClick={handleClick}
              className="custom-button-save"
            >
              Volver a NanaPass
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CancelPage;
