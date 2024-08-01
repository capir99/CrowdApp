import React, { useState, useEffect, useCallback } from "react";
import { Container, Alert } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const EmailVerification = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code");
  const email = queryParams.get("email");

  // Memoizar la función verifyEmail
  const verifyEmail = useCallback(
    async (code, email) => {
      try {
        const response = await fetch(`${apiUrl}/user/verify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code, email }),
        });

        if (response.ok) {
          toast.success(
            "Cuenta confirmada exitosamente, ahora puede autenticarse sin problema."
          );
          const storedUrl = localStorage.getItem("lastUrl");
          // Extraer la parte relativa de la URL
          const relativeUrl =
            new URL(storedUrl).pathname + new URL(storedUrl).search;
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
        toast.error(err);
      }
    },
    [navigate, apiUrl]
  );

  useEffect(() => {
    if (code && email) {
      verifyEmail(code, email);
    } else {
      setError("Código de confirmación o correo electrónico faltante.");
    }
  }, [code, email, verifyEmail]);

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
