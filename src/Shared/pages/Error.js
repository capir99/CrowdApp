import React from "react";
import logo from "../../assets/logo404.PNG"; // Importa tu logo aquí

const Error = () => {
  return (
    <div style={styles.container}>
      <img src={logo} alt="Logo" style={styles.logo} />
      <div style={styles.content}>
        <h1 style={styles.heading}>Error 404</h1>
        <p style={styles.message}>
          Lo sentimos, la página que buscas no se ha encontrado.
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "100vh",
    backgroundColor: "#f8f9fa",
  },
  logo: {
    width: 350,
    marginBottom: 20,
  },
  content: {
    textAlign: "center",
  },
  heading: {
    fontSize: 36,
    marginBottom: 10,
  },
  message: {
    fontSize: 18,
  },
};

export default Error;
