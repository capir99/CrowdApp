import React, { useState, useEffect } from "react";
import { Container, Alert } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

const EmailVerification = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code");
  const email = queryParams.get("email");

  useEffect(() => {
    if (code && email) {
      verifyEmail(code, email);
    } else {
      setError("Código de confirmación o correo electrónico faltante.");
    }
  }, [code, email]);

  const verifyEmail = async (code, email) => {
    try {
      const response = await fetch("http://localhost:3001/api/user/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, email }),
      });

      if (response.ok) {
        alert("Correo confirmado exitosamente.");
        const storedUrl = localStorage.getItem("lastUrl");
        // Extraer la parte relativa de la URL
        const relativeUrl = new URL(storedUrl).pathname + new URL(storedUrl).search;
        console.log("VAmos a ir a :", relativeUrl);
        if (storedUrl) {
          // Redirige a la URL almacenada
          navigate(relativeUrl);
        } else {
          // Si no hay URL almacenada, redirige a una página por defecto
          navigate("/");
        }
      } else {
        setError("Código de confirmación inválido o usuario no encontrado.");
      }
    } catch (err) {
      setError("Error al confirmar el correo.");
    }
  };

  return (
    <Container className="d-flex justify-content-center">
      <div className="mt-5">
        {error && <Alert variant="danger">{error}</Alert>}
        <h2 className="text-center mb-4">Verificación de Correo</h2>
        <p className="text-center">Estamos verificando tu correo...</p>
      </div>
    </Container>
  );
};

export default EmailVerification;
