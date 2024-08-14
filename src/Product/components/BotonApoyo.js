import "../../css/resumen.css";
import { Container, Button, Modal } from "react-bootstrap";
import iconAyudar from "../../img/icons/HandHeart1.png";
import React, { useState } from "react";
import LoginForm from "../../Login/components/LoginForm";
import Resume from "../../Product/components/Resume";

// Componente principal para el botón de pago
const BotonApoyo = ({ producto, isMobile, amount, setAmount }) => {
  const [sessionId, setSessionId] = useState(null);

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

  const handleClose = () => {
    setShow(false);
  };

  return (
    <Container>
      <Button
        variant="primary"
        onClick={handleApoyoClick2}
        className="mb-4 custom-button-apoyar"
      >
        <img src={iconAyudar} alt="Ayudar Icon" className="icon-ayudar" />
        <span id="valor-aporte">{amount} € </span>
        Apoya a {producto.name}
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton></Modal.Header>
        <h1 className="text-center">Inicia sesión</h1>
        <h4 className="text-center">Iniciar sesión para continuar</h4>
        <Modal.Body>
          <LoginForm handleClose={handleClose} />
        </Modal.Body>
      </Modal>

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
