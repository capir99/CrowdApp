import React, { useState } from "react";
import { Modal, Button, Toast } from "react-bootstrap";
import email from "../../img/icons/email.png";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
} from "react-share";
import { FacebookIcon, WhatsappIcon, TwitterIcon } from "react-share";

const ShareModal = ({ show, handleClose, shareUrl }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  // Mensaje predefinido
  const message =
    "¡No te pierdas la oportunidad de compartir esto! Visita el enlace para ayudar a tu artista favorito: ";

  // URL para compartir en X (anteriormente Twitter)
  const xShareUrl = `https://x.com/intent/tweet?url=${encodeURIComponent(
    shareUrl
  )}&text=${encodeURIComponent(message)}`;

  // Función para copiar al portapapeles
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 3000); // Ocultar notificación después de 3 segundos
      })
      .catch((err) => console.error("Error copying text: ", err));
  };

  // URL para compartir por correo electrónico
  const emailShareUrl = `mailto:?subject=¡Descubre esto!&body=${encodeURIComponent(
    message + " " + shareUrl
  )}`;

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Compartir en</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-around">
            <FacebookShareButton
              url={shareUrl}
              quote={message}
              className="me-2"
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <WhatsappShareButton
              url={shareUrl}
              title={message}
              className="me-2"
            >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <a href={xShareUrl} target="_blank" rel="noopener noreferrer">
              <TwitterIcon size={32} round />
            </a>
            <a href={emailShareUrl} className="me-2">
              <img src={email} alt="Email" width="32" height="32" />
            </a>
            <Button onClick={copyToClipboard} variant="outline-primary">
              Copiar enlace
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Notificación de copiado */}
      {copySuccess && (
        <Toast
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 1000,
          }}
          onClose={() => setCopySuccess(false)}
          show={copySuccess}
          delay={3000}
          autohide
        >
          <Toast.Body>Enlace copiado al portapapeles!</Toast.Body>
        </Toast>
      )}
    </>
  );
};

export default ShareModal;
