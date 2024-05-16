import React from "react";
import man_icon from "../../img/icons/man.png";
import house_icon from "../../img/icons/house.png";
import heart_icon from "../../img/icons/heart.png";
import { Navbar, Nav, Container } from "react-bootstrap";

const Menu = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#">
              <div className="center-content">
                <img
                  src={man_icon}
                  alt="A pie de calle"
                  className="menu-icon"
                />
                <span>A pie de calle</span> {/* Texto acompañante */}
              </div>
            </Nav.Link>
            <Nav.Link href="#">
              <div className="center-content">
                <img src={house_icon} alt="En el campo" className="menu-icon" />
                <span>En el campo</span> {/* Texto acompañante */}
              </div>
            </Nav.Link>
            <Nav.Link href="#">
              <div className="center-content">
                <img
                  src={heart_icon}
                  alt="Ayuda a Ayudar"
                  className="menu-icon"
                />
                <span>Ayuda a Ayudar</span> {/* Texto acompañante */}
              </div>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
