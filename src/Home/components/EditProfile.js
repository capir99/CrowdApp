import "../../css/editProfile.css";
import { toast } from "react-toastify";
import { Container, Row, Col, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";

const EditProfile = ({ handleCloseProfile }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const userEmail = localStorage.getItem("user-email")?.replace(/^"|"$/g, "");

  const [userData, setUserData] = useState({});
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState({
    name: "",
    surname: "",
    phone: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${apiUrl}/user/search/${userEmail}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (data.length > 0) {
          setUserData(data[0]);
          setTempValue({
            name: data[0].name,
            surname: data[0].surname,
            phone: data[0].phone,
            email: data[0].email,
            password: data[0].password,
          });
        } else {
          console.log("No hay datos disponibles.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    if (userEmail) {
      fetchData();
    }
  }, [apiUrl, userEmail]);

  const handleEnableEdit = (e) => {
    const field = e.currentTarget.id;
    setEditingField(field);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/user/modify/${userData._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tempValue),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el usuario");
      }

      toast.success(`Actualización datos de usuario exitosa`);

      localStorage.setItem("user-name", JSON.stringify(tempValue.name));
      localStorage.setItem("user-surname", JSON.stringify(tempValue.surname));
      localStorage.setItem("user-email", JSON.stringify(tempValue.email));

      handleCloseProfile();
      setUserData(tempValue);
      setEditingField(null);
    } catch (error) {
      console.error("Error:", error);
      alert(`Error al actualizar el usuario: ${error.message}`);
    }
  };

  const obfuscatePassword = (password) => {
    return "*".repeat(password.length);
  };

  return (
    <Container className="d-flex flex-column">
      <Form onSubmit={handleSave}>
        <Form.Group className="mb-1" controlId="name">
          <Row>
            <Col xs={3} className="text-center mb-4">
              <div>
                <span>Nombre</span>
              </div>
            </Col>
            <Col xs={6} className="text-center mb-4">
              <Form.Control
                className={`profile-control ${
                  editingField !== "name" ? "profile-control-readonly" : ""
                }`}
                type="text"
                placeholder="Nombre"
                name="name"
                value={tempValue.name}
                onChange={handleChange}
                readOnly={editingField !== "name"}
              />
            </Col>
            <Col xs={1} className="text-center mb-4">
              <Button
                id="name"
                className="icon-profile-edit"
                onClick={handleEnableEdit}
              >
                <i className="fas fa-pencil-alt"></i>
              </Button>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-1" controlId="surname">
          <Row>
            <Col xs={3} className="text-center mb-4">
              <div>
                <span>Apellido</span>
              </div>
            </Col>
            <Col xs={6} className="text-center mb-4">
              <Form.Control
                className={`profile-control ${
                  editingField !== "surname" ? "profile-control-readonly" : ""
                }`}
                type="text"
                placeholder="Apellido"
                name="surname"
                value={tempValue.surname}
                onChange={handleChange}
                readOnly={editingField !== "surname"}
              />
            </Col>
            <Col xs={1} className="text-center mb-4">
              <Button
                id="surname"
                className="icon-profile-edit"
                onClick={handleEnableEdit}
              >
                <i className="fas fa-pencil-alt"></i>
              </Button>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-1" controlId="phone">
          <Row>
            <Col xs={3} className="text-center mb-4">
              <div>
                <span>Teléfono</span>
              </div>
            </Col>
            <Col xs={6} className="text-center mb-4">
              <Form.Control
                className={`profile-control ${
                  editingField !== "phone" ? "profile-control-readonly" : ""
                }`}
                type="text"
                placeholder="Teléfono"
                name="phone"
                value={tempValue.phone}
                onChange={handleChange}
                readOnly={editingField !== "phone"}
              />
            </Col>
            <Col xs={1} className="text-center mb-4">
              <Button
                id="phone"
                className="icon-profile-edit"
                onClick={handleEnableEdit}
              >
                <i className="fas fa-pencil-alt"></i>
              </Button>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-1" controlId="email">
          <Row>
            <Col xs={3} className="text-center mb-4">
              <div>
                <span>Email</span>
              </div>
            </Col>
            <Col xs={6} className="text-center mb-4">
              <Form.Control
                className={`profile-control ${
                  editingField !== "email" ? "profile-control-readonly" : ""
                }`}
                type="email"
                placeholder="Email"
                name="email"
                value={tempValue.email}
                onChange={handleChange}
                readOnly={editingField !== "email"}
              />
            </Col>
            <Col xs={1} className="text-center mb-4">
              <Button
                id="email"
                className="icon-profile-edit"
                onClick={handleEnableEdit}
              >
                <i className="fas fa-pencil-alt"></i>
              </Button>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-1" controlId="password">
          <Row>
            <Col xs={3} className="text-center mb-4">
              <div>
                <span>Contraseña</span>
              </div>
            </Col>
            <Col xs={6} className="text-center mb-4">
              <Form.Control
                className={`profile-control ${
                  editingField !== "password" ? "profile-control-readonly" : ""
                }`}
                type={editingField === "password" ? "text" : "password"}
                placeholder="Contraseña del artista"
                name="password"
                value={tempValue.password}
                onChange={handleChange}
                readOnly={editingField !== "password"}
              />
            </Col>
            <Col xs={1} className="text-center mb-4">
              <Button
                id="password"
                className="icon-profile-edit"
                onClick={handleEnableEdit}
              >
                <i className="fas fa-pencil-alt"></i>
              </Button>
            </Col>
          </Row>
        </Form.Group>

        <Row>
          <Col className="d-flex justify-content-center mt-4">
            <Button type="submit" className="custom-button-save">
              Guardar cambios
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default EditProfile;
