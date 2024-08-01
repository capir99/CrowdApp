import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";

// const jwt = require("jsonwebtoken");

const LoginForm = ({ handleClose }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  // Función para manejar el inicio de sesión
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const config = {
        method: "POST", // Cambiado a POST
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      };
      const response = await fetch(`${apiUrl}/user/login`, config);
      const data = await response.json();

      if (!data.message) {
        // Almacenar los datos del usuario en localStorage
        localStorage.setItem("user-email", JSON.stringify(data.user.email));
        localStorage.setItem("user-name", JSON.stringify(data.user.name));
        localStorage.setItem("user-surname", JSON.stringify(data.user.surname));
        localStorage.setItem("user-rol", JSON.stringify(data.user.rol));
        localStorage.setItem("user-state", JSON.stringify(data.user.state));
        handleClose();
      } else {
        // Actualizar el estado de error
        setError(data.message || "Error desconocido");
      }
    } catch (error) {
      setError("Error al autenticarse: " + error.message);
      console.error("Error al autenticarse:", error);
    }
  };

  // const respuestaGoogle = (resp) => {
  //   console.log(resp);
  // };
  // const history = useHistory();
  // const respuestaGoogle = (respuesta) => {
  //   console.log(respuesta);

  //   if (respuesta) {
  //     if (!respuesta.error) {
  //       localStorage.setItem("token", respuesta.tokenId);

  //       //Función para consultar si el usuario ya existe en el sistema
  //       async function validarUsuario() {
  //         const token = localStorage.getItem("token");
  //         const config = {
  //           method: "GET",
  //           headers: {
  //             Authorization: "Bearer " + token,
  //             "Content-Type": "application/json",
  //           },
  //         };

  //         const response = await fetch(
  //           "http://localhost:3002/api/usuarios/list",
  //           config
  //         );
  //         await response.json();
  //       }
  //       validarUsuario();

  //       // //Identificación del rol
  //       // if (localStorage.getItem("token")) {
  //       //   async function fetchData() {
  //       //     const response = await fetch(
  //       //       "http://localhost:3002/api/usuarios/search/" + decodedToken.email
  //       //     );
  //       //     const datos = await response.json();
  //       //     if (datos[0]) {
  //       //       localStorage.setItem("rol", datos[0].rol);
  //       //       localStorage.setItem("estado", datos[0].estado);
  //       //     }
  //       //   }
  //       //   const decodedToken = jwt.decode(
  //       //     localStorage.getItem("token"),
  //       //     process.env.JWT_KEY
  //       //   );

  //       //   if (decodedToken) {
  //       //     fetchData();
  //       //   }
  //       // }

  //       // history.push("/home");
  //     }
  //   }
  // };

  return (
    <Form>
      {error && (
        <div
          style={{ color: "red", marginBottom: "15px", textAlign: "center" }}
        >
          {error}
        </div>
      )}
      <Form.Group
        controlId="usuario"
        className="d-flex justify-content-center mb-4"
      >
        <Form.Control
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            backgroundColor: "#f0f0f0",
            padding: "8px",
            borderRadius: "15px",
            boxShadow: "0 4px 20px rgba(14,14,252,0.2)",
            marginBottom: "15px",
            width: "100%",
          }}
        />
      </Form.Group>
      <Form.Group
        controlId="password"
        className="d-flex justify-content-center mb-4"
      >
        <Form.Control
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            backgroundColor: "#f0f0f0",
            padding: "8px",
            borderRadius: "15px",
            boxShadow: "0 4px 20px rgba(14,14,252,0.2)",
            marginBottom: "15px",
            width: "100%",
          }}
        />
      </Form.Group>

      <Form.Group className="text-center mb-4">
        <Button variant="primary" onClick={handleLogin}>
          LOGIN
        </Button>
      </Form.Group>

      <Form.Group className="d-flex justify-content-center mb-4">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
          }}
          onError={(error) => {
            console.error("Error during Google login:", error);
          }}
        />
      </Form.Group>

      <Form.Group className="text-center">
        <div>¿No tienes cuenta aún?</div>
        <Button variant="link" as={Link} to="/Signup">
          Crear una nueva cuenta
        </Button>
      </Form.Group>
    </Form>
  );
};

export default LoginForm;
