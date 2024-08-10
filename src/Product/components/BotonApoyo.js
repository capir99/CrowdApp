import "../../css/resumen.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Container, Button, Modal } from "react-bootstrap";
import React, { useState } from "react";
import CheckoutForm from "./CheckoutForm";
import LoginForm from "../../Login/components/LoginForm";
import Resume from "../../Product/components/Resume";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PROMISE);

// Componente principal para el botón de pago
const BotonApoyo = ({ producto, isMobile, amount, setAmount }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [sessionId, setSessionId] = useState(null);

  const handleApoyoClick = async () => {
    // Obtener la URL actual y guardar la URL en localStorage
    const currentUrl = window.location.href;
    localStorage.setItem("lastUrl", currentUrl);

    // Obtener la variable que evidencia si el usuario actual esta autenticado o no
    const auth_user = localStorage.getItem("user-email");

    if (auth_user !== null && auth_user.trim() !== "") {
      try {
        const config = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };

        // Llamada a la API para obtener la sesión de pago desde el backend
        const response = await fetch(`${apiUrl}/payment/session`, config);
        const session = await response.json();

        if (session && session.id) {
          console.log("ID de sesión recibido:", session.id);
          setSessionId(session.id); // Guarda el ID de sesión en el estado local
        } else {
          console.error("No se recibió el ID de sesión de pago.");
        }
      } catch (error) {
        console.error("Error al iniciar el flujo de pago:", error);
      }
    } else {
      handleShow();
    }
  };

  const handleApoyoClick2 = () => {
    handleShowResume();
  };
  // funciones visibilidad del resumen antes de la pasarela
  const [showResume, setShowResume] = useState(false);
  const handleShowResume = () => {
    setShowResume(true);
  };
  const handleCloseResume = () => {
    setShowResume(false);
  };

  // funciones visibilidad del cuadro de autenticación
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  return (
    <Container>
      <Button variant="primary" onClick={handleApoyoClick2} className="mb-4">
        Apoyar a {producto.name}
      </Button>

      {/* {sessionId && (
        <Elements stripe={stripePromise}>
          <CheckoutForm sessionId={sessionId} />
        </Elements>
      )} */}

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton></Modal.Header>
        <h1 className="text-center">Inicia sesión</h1>
        <h4 className="text-center">Iniciar sesión para continuar</h4>
        <Modal.Body>
          <LoginForm handleClose={handleClose} />
        </Modal.Body>
      </Modal>

      {/* <Modal show={showResume} onHide={handleCloseResume} centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Resume
            handleCloseResume={handleCloseResume}
            setSessionId={setSessionId}
            sessionId={sessionId}
            producto={producto}
            isMobile={isMobile}
            amount={amount}
            setAmount={setAmount}
          />
        </Modal.Body>
      </Modal> */}

      <Modal
        show={showResume}
        onHide={handleCloseResume}
        centered
        className="modal-custom-res" // Aplica la clase personalizada
      >
        <Modal.Body>
          <Resume
            handleCloseResume={handleCloseResume}
            setSessionId={setSessionId}
            sessionId={sessionId}
            producto={producto}
            isMobile={isMobile}
            amount={amount}
            setAmount={setAmount}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default BotonApoyo;
