import React from "react";
import man_icon from "../../img/icons/man.png";
import house_icon from "../../img/icons/house.png";
import heart_icon from "../../img/icons/heart.png";
import { Navbar, Container, Nav, Button } from "react-bootstrap";

const Menu = ({ onSearch }) => {
  const handleButtonSelection = (event) => {
    const name = event.currentTarget.getAttribute("name");
    console.log("Pulsado:", name);
    onSearch(name);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* Botón A pie de calle */}
            <Button
              name="ApieCalle"
              variant="link"
              onClick={handleButtonSelection}
              className="nav-link"
            >
              <div className="center-content">
                <img
                  src={man_icon}
                  alt="A pie de calle"
                  className="menu-icon"
                />
                <span>A pie de calle</span>
              </div>
            </Button>

            {/* Botón En el campo */}
            <Button
              name="EnCampo"
              variant="link"
              onClick={handleButtonSelection}
              className="nav-link"
            >
              <div className="center-content">
                <img
                  src={house_icon}
                  alt="En el campo"
                  className="menu-icon"
                />
                <span>En el campo</span>
              </div>
            </Button>

            {/* Botón Ayuda a Ayudar */}
            <Button
              name="ayudaAyudar"
              variant="link"
              onClick={handleButtonSelection}
              className="nav-link"
            >
              <div className="center-content">
                <img
                  src={heart_icon}
                  alt="Ayuda a Ayudar"
                  className="menu-icon"
                />
                <span>Ayuda a Ayudar</span>
              </div>
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
