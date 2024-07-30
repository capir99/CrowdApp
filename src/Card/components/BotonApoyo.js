import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Container, Button, Modal } from "react-bootstrap";
import React, { useState } from "react";
import CheckoutForm from "./CheckoutForm";
import LoginForm from "../../Shared/components/LoginForm";

const stripePromise = loadStripe(
  "pk_test_51PYebbDujtx63ft0eF7xGn86AtB6MkXeQE5QSFmlTrrDA0mWJEQ3HSBOu1hudKkVrTjB3pnYFz1Wd80e7PpiMqlU00sGIgxCga"
);

// Componente principal para el botón de pago
const BotonApoyo = ({ producto }) => {
  const [sessionId] = useState(null);

  const handleApoyoClick = async () => {
    // Obtener la URL actual y guardar la URL en localStorage
    const currentUrl = window.location.href; 
    localStorage.setItem("lastUrl", currentUrl);

    handleShow();
    // try {
    //   const config = {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   };

    //   // Llamada a la API para obtener la sesión de pago desde el backend
    //   const response = await fetch(
    //     "http://localhost:3001/api/payment/session",
    //     config
    //   );
    //   const session = await response.json();

    //   if (session && session.id) {
    //     console.log("ID de sesión recibido:", session.id);
    //     setSessionId(session.id); // Guarda el ID de sesión en el estado local
    //   } else {
    //     console.error("No se recibió el ID de sesión de pago.");
    //   }
    // } catch (error) {
    //   console.error("Error al iniciar el flujo de pago:", error);
    // }
  };

  // funciones visibilidad del cudro de autenticación
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  return (
    <Container>
      <Button variant="primary" onClick={handleApoyoClick}>
        Apoyar a {producto.name}
      </Button>
      {sessionId && (
        <Elements stripe={stripePromise}>
          <CheckoutForm sessionId={sessionId} />
        </Elements>
      )}

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton></Modal.Header>
        <h1 className="text-center">Inicia sesión</h1>
        <h4 className="text-center">Iniciar sesión para continuar</h4>
        <Modal.Body>
          <LoginForm handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default BotonApoyo;
