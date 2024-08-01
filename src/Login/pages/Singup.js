import React, { useState } from "react";
import { toast } from "react-toastify";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { FaAddressCard, FaAt, FaPhoneVolume } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoPersonCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const Signup = ({ handleClose }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  // Fecha actual en formato YYYY-MM-DD
  const today = new Date().toISOString().split("T")[0];
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    terms: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    date_creation: today,
    email: "",
    phone: "",
    state: 1,
    rol: "us-partner",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: value,
      };

      // Validate email
      if (name === "email") {
        setErrors({
          ...errors,
          email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            ? ""
            : "Correo electrónico inválido",
        });
      }

      // Validate passwords
      if (name === "password" || name === "password_confirmation") {
        const password = updatedData.password;
        const passwordConfirmation = updatedData.password_confirmation;

        const passwordValid =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/.test(
            password
          );
        const passwordsMatch = password === passwordConfirmation;

        setErrors({
          ...errors,
          password: !passwordValid
            ? "La contraseña debe tener al menos 12 caracteres, incluyendo 1 mayúscula, 1 minúscula, 1 número y 1 símbolo."
            : !passwordsMatch
            ? "Las contraseñas no coinciden."
            : "",
        });
      }

      return updatedData;
    });
  };

  const handleCancel = () => {
    navigate(-1); // Regresa a la página anterior
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Extraer la parte relativa de la URL
    const storedUrl = localStorage.getItem("lastUrl");
    const relativeUrl = new URL(storedUrl).pathname + new URL(storedUrl).search;

    // Validate passwords and terms acceptance before submission
    const { password, password_confirmation, termsAccepted } = formData;
    const passwordsMatch = password === password_confirmation;
    const passwordValid =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/.test(
        password
      );

    if (!termsAccepted) {
      setErrors({
        ...errors,
        terms:
          "Debe aceptar los Términos de Servicio y la Declaración de Privacidad.",
      });
      return;
    }

    if (passwordValid && passwordsMatch && !errors.email) {
      const config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };
      try {
        const response = await fetch(`${apiUrl}/user/add/`, config);

        if (response.status === 409) {
          // Manejar el caso cuando el email ya está registrado
          const errorData = await response.json();
          throw new Error(errorData.message || "El email ya está registrado.");
        } else if (!response.ok) {
          // Manejar otros errores
          throw new Error("Error al registrar usuario");
        }

        toast.success(
          "Registro exitoso, a continuación se ha enviado un mensaje de texto al correo eletrónico registrado por usted mediente el cual podrá activar su cuenta "
        );
        navigate(relativeUrl);
      } catch (error) {
        console.error("Error:", error);
        toast.error(error.message);
      }

      // Resetear el formulario después de enviar los datos
      setFormData({
        name: "",
        surname: "",
        date_creation: today,
        email: "",
        phone: "",
        state: 1,
        rol: "us-partner",
        pass: "",
        password_confirmation: "",
      });
    } else {
      // Trigger password validation error if needed
      setErrors({
        ...errors,
        password: !passwordValid
          ? "La contraseña debe tener al menos 12 caracteres, incluyendo 1 mayúscula, 1 minúscula, 1 número y 1 símbolo."
          : !passwordsMatch
          ? "Las contraseñas no coinciden."
          : "",
      });
    }
  };

  return (
    <Container className="d-flex justify-content-center">
      <Form onSubmit={handleSubmit} className="mt-5 form-container">
        <h2 className="text-center mb-4 c-white">
          Registro <FaAddressCard />
        </h2>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Label className="c-white">
              Nombre <IoPersonCircle className="icon-color" /> *
            </Form.Label>
          </Col>
          <Col md={8}>
            <Form.Control
              className="form-control"
              type="text"
              placeholder="Ingrese su nombre"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Label>
              Apellidos <IoPersonCircle className="icon-color" />
            </Form.Label>
          </Col>
          <Col md={8}>
            <Form.Control
              className="form-control"
              type="text"
              placeholder="Ingrese su apellido"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Label>
              Correo <FaAt className="icon-color" /> *
            </Form.Label>
          </Col>
          <Col md={8}>
            <Form.Control
              className="form-control"
              type="email"
              placeholder="Ingrese su correo electrónico"
              name="email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Label>
              Teléfono <FaPhoneVolume className="icon-color" /> *
            </Form.Label>
          </Col>
          <Col md={7}>
            <PhoneInput
              international
              defaultCountry="ES"
              value={formData.phone}
              onChange={(value) => setFormData({ ...formData, phone: value })}
              required
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Label>
              Contraseña <RiLockPasswordFill className="icon-color" /> *
            </Form.Label>
          </Col>

          <Col md={8}>
            <Form.Control
              className="form-control"
              type="password"
              placeholder="Digite su contraseña"
              name="password"
              value={formData.password}
              isInvalid={!!errors.password}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Label>
              Confirmar <RiLockPasswordFill className="icon-color" />*
            </Form.Label>
          </Col>
          <Col md={8}>
            <Form.Control
              className="form-control"
              type="password"
              placeholder="Confirme nuevamente su contraseña"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              isInvalid={!!errors.password}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4} className="form-check-custom">
            <Form.Check
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              isInvalid={!!errors.terms}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.terms}
            </Form.Control.Feedback>
          </Col>
          <Col md={8}>
            <Form.Label>
              Acepto los{" "}
              <a href="/terms" target="_blank">
                Términos de Servicio y la Declaración de Privacidad
              </a>{" "}
              *
            </Form.Label>
          </Col>
        </Row>

        <Row className="mb-5 mt-5">
          <Col className="button-spacing">
            <Button variant="success" type="submit" className="w-40">
              Registrar
            </Button>
            <Button variant="dark" className="w-40 ms-2" onClick={handleCancel}>
              Cancelar
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Signup;
