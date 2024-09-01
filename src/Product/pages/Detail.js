import BotonApoyo from "../components/BotonApoyo";
import like from "../../img/icons/megusta.png";
import share from "../../img/icons/compartir.png";
import heart from "../../img/icons/heart_red.png";
import heart2 from "../../img/icons/heart_red2.png";
import location from "../../img/icons/location_ORI.png";
import logo from "../../img/icons/logo.PNG";
import profile1 from "../../img/icons/profile.png";
import profile2 from "../../img/icons/colorprofile.png";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useMediaQuery } from "react-responsive";
import { Container, Row, Col, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "../../css/detalle.css";
import LoginForm from "../../Login/components/LoginForm";
import ShareModal from "../components/ShareModal";
import { toast } from "react-toastify";

const stripePromise = loadStripe(
  "pk_live_51PYebbDujtx63ft0LDiJHsQgIzgcNe4prgZOqYJvrfzOTj2oFONXzUvspklEXY2XYlwnL4ImsFqm3LJvfOqu8UZM00XaMA3eBl"
);

const Detail = () => {
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  const { id } = useParams();
  const [producto, setProducto] = useState([]);
  const [amount, setAmount] = useState(5);
  const [showShareModal, setShowShareModal] = useState(false);
  const [productUpdated, setProductUpdated] = useState(false);

  // Función para cargar los datos del producto
  const fetchProductData = async () => {
    try {
      const response = await fetch(`${apiUrl}/products/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setProducto(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchProductData();
  });

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

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const handleShowShareModal = () => setShowShareModal(true);
  const handleCloseShareModal = () => setShowShareModal(false);
  const shareUrl = `${window.location.href}`;

  //Función para dar un like
  const generarLike = () => {
    async function fetchData() {
      const config = {
        method: "PATCH", // Usamos PATCH para actualizaciones parciales
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ likes: producto.likes + 1 }),
      };
      try {
        const response = await fetch(
          `${apiUrl}/products/modifyLikes/${producto._id}`,
          config
        );
        if (!response.ok) {
          throw new Error("Error al actualizar el like, intenta de nuevo");
        }
        toast.success("¡Gracias por tu apoyo!");
        setProductUpdated((prev) => !prev); // Cambia el estado para recargar los datos
      } catch (error) {
        console.error("Error:", error);
        toast.error(error.message);
      }
    }
    fetchData();
  };

  //Función para manejar el clic en el botón de like
  const handleLike = () => {
    if (!userName) {
      handleShowLogin();
    } else {
      const hasLiked = localStorage.getItem(`liked-${producto._id}`);
      if (hasLiked) {
        toast.info("Ya has dado un like a este artista.");
      } else {
        generarLike();
        localStorage.setItem(`liked-${producto._id}`, true);
      }
    }
  };

  // Función para manejar el clic en el botón
  const handleHomeClick = () => {
    navigate("/"); // Redirige a la página de inicio
  };

  return (
    <Container>
      <div className="header-container-left">
        <button type="button" className="icon-button" onClick={handleHomeClick}>
          <img className="logo-nana-detalle" src={logo} alt="Logo" />
        </button>
        <div className="profile-position">
          <button className="icon-profile-detalle" onClick={handleProfile}>
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

      <Form.Group>
        <Row className="row-custom-detalle">
          <Col xs={12} md={6}>
            <p className="h4 mb-3 fw-normal text-start">
              {producto.name} "{producto.title}"
            </p>
          </Col>
          <Col xs={12} md={6}>
            <div className="col-md-6 col-sm-12 col-lg-12 control-aporte d-flex justify-content-center align-items-center">
              <button
                type="button"
                className="icon-button circular-button"
                onClick={handleShowShareModal}
              >
                <img className="circular-button-icon" src={share} alt="like" />
              </button>
              <div>
                <div className="text-mid">Compartir </div>
              </div>
              <button
                type="button"
                className="icon-button circular-button"
                onClick={handleLike}
              >
                <img className="circular-button-icon" src={like} alt="like" />
              </button>
              <div>
                <div className="text-mid">Me gusta </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="row-custom-detalle mb-3">
          <Col xs={12} md={6}>
            <div className="col-md-6 col-sm-12 col-lg-12 ">
              <img
                src={`${process.env.PUBLIC_URL}/img/${producto.imag}`}
                alt="pickImage"
                className={
                  isMobile
                    ? "full-width-image imagen-con-borde"
                    : "full-width-image imagen-con-borde"
                }
              />
            </div>
          </Col>

          <Col xs={12} md={6} id="card" className="col-6 col-custom">
            <div className="text-container-res">
              <div className="col-md-6 col-sm-12 col-lg-12 control-aporte d-flex mb-4">
                <img
                  className="detalle-avatar"
                  src={`${process.env.PUBLIC_URL}/img/${producto.imag}`}
                  alt="profileimg"
                />
                <div className="ms-2 me-3">
                  <p className="mb-1 fw-normal text-start">
                    <strong>{producto.name}</strong>
                  </p>
                  <p className="mb-1 fw-normal text-start text-grey">
                    {producto.title}
                  </p>
                </div>
              </div>

              <div className="col-md-6 col-sm-12 col-lg-12 control-aporte d-flex">
                <p className="h4 mb-3 fw-normal text-justify">
                  {producto.invitation}
                </p>
                <div className="col-md-6 col-sm-12 control-aporte-res d-flex justify-content-center align-items-center">
                  <button
                    className="icon-button-res circular-button-amount control-amount-detalle"
                    onClick={handlePlusClick}
                  >
                    <div className="ope-display-detalle">+ </div>
                  </button>
                  <div className="control-aporte-item">
                    <div className="amount-display-detalle">{amount} €</div>
                  </div>
                  <button
                    className="icon-button-res circular-button-amount control-amount-detalle"
                    onClick={handleMinusClick}
                  >
                    <div className="ope-display-detalle">-</div>
                  </button>
                </div>
              </div>

              <div className="col-md-6 col-sm-12 col-lg-12 d-flex justify-content-center align-items-center">
                <div>
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
            </div>
          </Col>
        </Row>
        <Row className="row-custom-detalle mb-2">
          <div className="col-md-6 col-sm-12 col-lg-12 d-flex">
            <img
              className="circular-button-icon"
              src={location}
              alt="location"
            />
            <div className="ms-2 me-3">
              <p className="mb-1 fw-normal text-start">
                <strong>Ubicación</strong>
              </p>
              <p className="mb-1 fw-normal text-start text-grey">
                Lo haz visto en {producto.location}
              </p>
            </div>

            <div className="control-rankin d-flex justify-content-center align-items-center">
              <img src={heart} alt="" className="control-rankin-heart" />
              <img src={heart} alt="" className="control-rankin-heart" />
              <img src={heart} alt="" className="control-rankin-heart" />
              <img src={heart} alt="" className="control-rankin-heart" />
              <img src={heart2} alt="" className="control-rankin-heart" />
              <p className="text-detalle-name ml-2">{producto.likes}M</p>
            </div>
          </div>
        </Row>
        <Row className="row-custom-detalle ">
          <Col xs={12} className="col-6 col-custom text-start">
            <p className="ms-3 fw-normal text-start m text-justify">
              {producto.details}
            </p>
          </Col>
        </Row>
        <br />
        <br />
      </Form.Group>
      {/* </Form> */}

      <ShareModal
        show={showShareModal}
        handleClose={handleCloseShareModal}
        shareUrl={shareUrl}
      />

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
export default Detail;
