import BotonApoyo from "../components/BotonApoyo";
import heart from "../../img/icons/heart_red.png";
import like from "../../img/icons/like.png";
import heart2 from "../../img/icons/heart_red2.png";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useMediaQuery } from "react-responsive";
import { Container, Row, Col, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import logo from "../../logo.png";
import wallet from "../../img/icons/mywallet.png";
import profile1 from "../../img/icons/profile.png";
import profile2 from "../../img/icons/colorprofile.png";
import "../../css/detalle.css";
import LoginForm from "../../Login/components/LoginForm";

const stripePromise = loadStripe(
  "pk_live_51PYebbDujtx63ft0LDiJHsQgIzgcNe4prgZOqYJvrfzOTj2oFONXzUvspklEXY2XYlwnL4ImsFqm3LJvfOqu8UZM00XaMA3eBl"
);

const Detail2 = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { id } = useParams();
  const [producto, setProducto] = useState([]);
  const [amount, setAmount] = useState(5);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${apiUrl}/products/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducto(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error state or show a message to the user
      }
    }
    fetchData();
  }, [id, apiUrl]);

  // funciones visibilidad del login

  const [showLogin, setShowLogin] = useState(false);
  const handleShowLogin = () => {
    setShowLogin(true);
  };
  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  const getProfileImage = (userName) => {
    if (userName) {
      return profile2;
    } else {
      return profile1;
    }
  };
  const userName = localStorage.getItem("user-name")?.replace(/^"|"$/g, "");
  const profileImage = getProfileImage(userName);

  const handleProfile = () => {
    if (!userName) {
      handleShowLogin();
    }
  };

  // Lógica para incrementar el valor del aporte
  const handlePlusClick = () => {
    setAmount((prevAmount) => prevAmount + 1);
  };

  // Lógica para decrementar el valor del aporte
  const handleMinusClick = () => {
    if (amount > 5) {
      setAmount((prevAmount) => prevAmount - 1);
    }
  };

  // Estado para controlar la pestaña activa
  const [activeTab, setActiveTab] = useState("tab1");

  // Actualiza el estado al hacer clic en una pestaña
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <Container>
      <div className="header-container-left">
        <img className="logo-nana-detalle" src={logo} alt="Logo" />
        <div className="icon-buttons">
          <button className="icon-profile" onClick={handleProfile}>
            {userName && (
              <img
                className="logo-profile_detalle"
                src={profileImage}
                alt="Perfil"
              />
            )}
            {userName && (
              <div className="text-container">
                <p>
                  Hola <strong>{userName}</strong>
                </p>
                <p>Bienvenido</p>
              </div>
            )}
            {!userName && (
              <div>
                <img
                  className="logo-profile_detalle"
                  src={profileImage}
                  alt="Perfil"
                />
                <div className="text-container">
                  <p>Iniciar Sesión</p>
                </div>
              </div>
            )}
          </button>
        </div>
      </div>

      <hr class="linea-division" />
      <Form>
        <Form.Group>
          <Row className="row-custom">
            <Col xs={6}>
              <p className="h4 mb-3 fw-normal text-start">
                {producto.name} "{producto.title}"
              </p>
            </Col>
            <Col xs={6}>
              <div className="col-md-6 col-sm-12 col-lg-12 control-aporte d-flex justify-content-center align-items-center">
                <button className="icon-button circular-button control-aporte-item">
                  <img src={like} alt="like" />
                </button>
                <div className="control-aporte-item">
                  <div>Compartir </div>
                </div>
                <button className="icon-button circular-button control-aporte-item">
                  <img src={like} alt="like" />
                </button>
                <div className="control-aporte-item">
                  <div>Me gusta </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="align-items-center row-custom">
            <Col xs={6} className="text-center col-1 col-custom">
              <div>
                <img
                  src={`${process.env.PUBLIC_URL}/img/${producto.imag}`}
                  alt="pickImage"
                  className={
                    isMobile
                      ? "full-width-image mx-auto d-block imagen-con-borde"
                      : "full-width-image mx-auto d-block imagen-con-borde"
                  }
                />
              </div>
            </Col>

            <Col xs={6} className="col-6 col-custom text-start">
              <div className="text-container-res text-start">
                <div className="col-md-6 col-sm-12 col-lg-12 control-aporte d-flex justify-content-center align-items-center">
                  <img
                    className="circular-button-avatar"
                    src={`${process.env.PUBLIC_URL}/img/${producto.imag}`}
                    alt="profileimg"
                  />
                  <div>
                    <p className="mb-1 fw-normal text-start">{producto.name}</p>
                    <p className="mb-1 fw-normal text-start">
                      {producto.title}
                    </p>
                  </div>
                </div>
                <div className="col-md-6 col-sm-12 col-lg-12 control-aporte d-flex justify-content-center align-items-center">
                  <p className="h4 mb-3 fw-normal text-justify">
                    {producto.invitation}
                  </p>
                  <div className="col-md-6 col-sm-12 control-aporte d-flex justify-content-center align-items-center">
                    <button
                      className="icon-button circular-button control-aporte-item"
                      onClick={handleMinusClick}
                    >
                      <div className="amount-display">-</div>
                    </button>
                    <div className="control-aporte-item">
                      <div className="amount-display">{amount} €</div>
                    </div>
                    <button
                      className="icon-button circular-button control-aporte-item"
                      onClick={handlePlusClick}
                    >
                      <div className="amount-display">+</div>
                    </button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Form.Group>
      </Form>

      <div className="container-detalle row container-lg">
        <div className="col-md-6 col-sm-12 d-flex flex-column justify-content-center align-items-center name-detalle">
          <p className="text-detalle-name">{producto.name}</p>
          <p className="text-detalle-title">"{producto.title}"</p>
          <div className="control-rankin d-flex justify-content-center align-items-center">
            <img src={heart} alt="" className="control-rankin-heart" />
            <img src={heart} alt="" className="control-rankin-heart" />
            <img src={heart} alt="" className="control-rankin-heart" />
            <img src={heart} alt="" className="control-rankin-heart" />
            <img src={heart2} alt="" className="control-rankin-heart" />
            <p className="text-detalle-name ml-2">{producto.likes}M</p>
          </div>
        </div>
        <div className="col-md-6 col-sm-12 control-aporte d-flex justify-content-center align-items-center">
          <button
            className="icon-button circular-button control-aporte-item"
            onClick={handleMinusClick}
          >
            <div className="amount-display">-</div>
          </button>
          <div className="control-aporte-item">
            <div className="amount-display">{amount} €</div>
          </div>
          <button
            className="icon-button circular-button control-aporte-item"
            onClick={handlePlusClick}
          >
            <div className="amount-display">+</div>
          </button>
        </div>
      </div>

      <p className="h4 mb-3 fw-normal text-center">{producto.invitation}</p>
      <div className="tabs-container container-lg">
        <div className="tabs d-flex justify-content-center">
          <div
            className={`tab ${activeTab === "tab1" ? "active" : ""}`}
            onClick={() => handleTabClick("tab1")}
          >
            Detalles
          </div>
          <div
            className={`tab ${activeTab === "tab2" ? "active" : ""}`}
            onClick={() => handleTabClick("tab2")}
          >
            Formas de ayudar
          </div>
        </div>

        <div className="tab-content">
          {activeTab === "tab1" && <p>{producto.details}</p>}
          {activeTab === "tab2" && <p>{producto.helpways}</p>}
        </div>

        {/* Espacio adicional */}
        <div style={{ marginBottom: "20px" }}></div>

        <div className="mt-4 mb-4">
          <Elements stripe={stripePromise}>
            <BotonApoyo
              producto={producto}
              isMobile={isMobile}
              amount={amount}
              setAmount={setAmount}
            />
          </Elements>
        </div>
      </div>

      {/* Espacio adicional para separar los botones */}
      <div style={{ marginBottom: "40px" }}></div>

      <Modal show={showLogin} onHide={handleCloseLogin} centered>
        <Modal.Header closeButton></Modal.Header>
        <h1 className="text-center">Inicia sesión</h1>
        <h4 className="text-center">Iniciar sesión para continuar</h4>
        <Modal.Body>
          <LoginForm handleClose={handleCloseLogin} />
        </Modal.Body>
      </Modal>
    </Container>
  );
};
export default Detail2;
