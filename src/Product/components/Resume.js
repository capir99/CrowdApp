import "../../css/resumen.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

const Resume = ({
  handleCloseResume,
  setSessionId,
  sessionId,
  producto,
  isMobile,
  amount,
  setAmount,
}) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PROMISE);

  const handleApoyoClick = async () => {
    const currentUrl = window.location.href;
    localStorage.setItem("lastUrl", currentUrl);

    const auth_user = localStorage.getItem("user-email");
    if (auth_user !== null && auth_user.trim() !== "") {
      try {
        const response = await fetch(`${apiUrl}/payment/session`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const session = await response.json();

        if (session && session.id) {
          console.log("ID de sesión recibido:", session.id);
          const stripe = await stripePromise;
          stripe.redirectToCheckout({ sessionId: session.id });
        } else {
          console.error("No se recibió el ID de sesión de pago.");
        }
      } catch (error) {
        console.error("Error al iniciar el flujo de pago:", error);
      }
    } else {
      alert("No estás autenticado.");
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

  return (
    <Container className="d-flex flex-column">
      <Form>
        <Form.Group className="mb-2">
          <Row className="align-items-center row-custom">
            <Col xs={2} className="text-center col-1 col-custom">
              <div className="parent-container">
                <img
                  src={`${process.env.PUBLIC_URL}/img/${producto.imag}`}
                  alt="pickImage"
                  className={
                    isMobile
                      ? "circular-image-resume mx-auto d-block"
                      : "circular-image-resume mx-auto d-block"
                  }
                />
              </div>
            </Col>
            <Col xs={8} className="text-center col-2 col-custom">
              <div className="text-container-res1">
                <div className="text-res1 col-md-6 col-sm-12 control-aporte-res d-flex justify-content-center align-items-center">
                  Estas apoyando a
                </div>
                <div className="text-res2 col-md-6 col-sm-12 control-aporte-res d-flex justify-content-center align-items-center">
                  {producto.name} {producto.surname}
                </div>
                <br />
                <div className="col-md-6 col-sm-12 control-aporte-res d-flex justify-content-center align-items-center">
                  <button
                    className="icon-button-res circular-button-res control-aporte-item-res"
                    onClick={handleMinusClick}
                  >
                    <div className="amount-display-res">-</div>
                  </button>
                  <div className="control-aporte-item">
                    <div className="amount-display-res">{amount} €</div>
                  </div>
                  <button
                    className="icon-button-res circular-button-res control-aporte-item-res"
                    onClick={handlePlusClick}
                  >
                    <div className="amount-display-res">+</div>
                  </button>
                </div>
              </div>
            </Col>
            <Col xs={2} className="text-center col-3 col-custom">
              <div className="text-container-res">
                <div className="text-res3">5€</div>
                <div className="text-res4">Remove</div>
              </div>
            </Col>
          </Row>
        </Form.Group>

        <Row>
          <p>
            NanaPass no cobra comisión a los beneficiarios, puedes aportar
            voluntariamente para ayudar a nuesttro servicio.
          </p>
          <div className="col-md-12 col-sm-12 control-aporte-res d-flex justify-content-center align-items-center">
            <button
              className="icon-button-res circular-button-res control-aporte-item-res"
              onClick={handleMinusClick}
            >
              <div className="amount-display-res">-</div>
            </button>
            <div className="control-aporte-item">
              <div className="amount-display-res">{0.8} €</div>
            </div>
            <button
              className="icon-button-res circular-button-res control-aporte-item-res"
              onClick={handlePlusClick}
            >
              <div className="amount-display-res">+</div>
            </button>
          </div>
        </Row>

        <Row>
          <p className="title_resumen">Resumen</p>
        </Row>

        <div className="combined-rows-container">
          <Row className="align-items-center row-custom">
            <Col xs={1} className="text-center col-custom">
              <div className="parent-container"></div>
            </Col>
            <Col xs={8} className="text-center col-custom">
              <div className="text-container-res">
                <p>Subtotal.</p>
                <p>Aporte voluntario a NanaPass</p>
                <p>
                  <strong>Total</strong>
                </p>
              </div>
            </Col>
            <Col xs={2} className="text-center col-custom">
              <div className="text-container-res">
                <p>5€</p>
                <p>0.80€</p>
                <strong>5€</strong>
              </div>
            </Col>
          </Row>
        </div>

        <Row>
          <Col className="d-flex justify-content-center mt-4">
            <Button
              variant="primary"
              onClick={handleApoyoClick}
              className="custom-button-save"
            >
              Continuar
            </Button>
            {sessionId && (
              <Elements stripe={stripePromise}>
                <CheckoutForm sessionId={sessionId} />
              </Elements>
            )}
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Resume;
