import React, { useEffect, useState } from "react";
import exitoso from "../../img/icons/pagoExitoso.png";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../css/success.css";

const SuccessPage = () => {
  const [, setSession] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    const fetchSessionData = async () => {
      // Extraer el session_id de la URL
      const urlParams = new URLSearchParams(window.location.search);
      const sessionId = urlParams.get("session_id");
      const apiUrl = process.env.REACT_APP_API_URL;
      console.log("Holaaaaa: :", localStorage.getItem("beneficiaryId"));

      if (hasFetched) return;

      setHasFetched(true);
      console.log("session_id extraído -:", sessionId); // Agrega este log

      if (sessionId) {
        try {
          // Hacer una solicitud a tu backend para verificar el estado del pago
          const config = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              beneficiaryId: localStorage.getItem("beneficiaryId"),
              supportAmount: localStorage.getItem("supportAmount"),
            }),
          };
          const response = await fetch(
            `${apiUrl}/payment/success/${sessionId}`,
            config
          );

          const data = await response.json();

          console.log("Respuesta servidor: ", data);
          if (response.ok) {
            setSession(data.session);
            setLoading(false);
          } else {
            setError(data.message || "Error al verificar el pago");
            setLoading(false);
          }
        } catch (err) {
          setError("Error al verificar el pago.");
          setLoading(false);
        }
      } else {
        setError("No se encontró el ID de sesión.");
        setLoading(false);
      }
    };

    fetchSessionData();
  }, [hasFetched]);

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
      <h1>{error ? "Error" : "Pago Exitoso"}</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <div>
          <p>¡Tu pago ha sido exitoso!</p>
          <img src={exitoso} alt="success" />
          <div>
            <Button
              variant="primary"
              onClick={handleClick}
              className="custom-button-save"
            >
              Volver a NanaPass
            </Button>{" "}
          </div>
        </div>
      )}
    </div>
  );
};

export default SuccessPage;
