import "../../css/wallet.css";
import React, { useState } from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import walllogo1 from "../../img/icons/AyudaAlguien.png";
import walllogo2 from "../../img/icons/CargatuCuenta.png";
import walllogo3 from "../../img/icons/tarjeta.png";
// import moneylogo from "../../img/icons/";

const WalletResume = ({ handleCloseWallet }) => {
  const [show, setShow] = useState(true);

  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  return (
    <Container className="d-flex flex-column align-items-center">
      <div className="d-flex justify-content-between align-items-center w-100 mb-2">
        <img className="logo1-wallet" src={walllogo1} alt="AyudaAlguien" />
        <img className="logo1-wallet" src={walllogo2} alt="CargatuCuenta" />
      </div>
      <img className="logo-full-width" src={walllogo3} alt="tarjeta" />
      <div className="overlay-text">
        <p>$149.868</p>
      </div>
      <div className="overlay-text2">
        <p>+49.89%</p>
      </div>
      <div>
        <Row className="align-items-center">
          <Col xs={4} className="text-center">
            <div className="parent-container">
              <div className="icon-container-m">
                <span className="icon-text-m">$</span>
              </div>
            </div>
          </Col>
          <Col xs={4} className="text-center">
            <div className="text-container-rw">
              <div className="text-rw1">15.789325</div>
              <div className="text-rw2">$5,85</div>
            </div>
          </Col>
          <Col xs={4} className="text-center">
            <div className="text-container-rw">
              <div className="text-rw3">$54.724</div>
              <div className="text-rw4">+54,23%</div>
            </div>
          </Col>
        </Row>

        <Row className="align-items-center">
          <Col xs={4} className="text-center">
            <div className="parent-container">
              <div className="icon-container-m">
                <span className="icon-text-m">$</span>
              </div>
            </div>
          </Col>
          <Col xs={4} className="text-center">
            <div className="text-container-rw">
              <div className="text-rw1">15.789325</div>
              <div className="text-rw2">$5,85</div>
            </div>
          </Col>
          <Col xs={4} className="text-center">
            <div className="text-container-rw">
              <div className="text-rw3">$54.724</div>
              <div className="text-rw4">+54,23%</div>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default WalletResume;
