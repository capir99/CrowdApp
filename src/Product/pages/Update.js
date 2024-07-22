import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";
import pickImage from "../../img/icons/pick.PNG";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Update = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [previewImage, setPreviewImage] = useState(pickImage); // Estado para previsualizar la imagen

  // Estado para almacenar los valores del formulario
  const [formData, setFormData] = useState({
    imag: "",
    name: "",
    title: "",
    location: "",
    invitation: "",
    details: "",
    helpways: "",
    likes: "0",
    category: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:3001/api/products/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        setFormData(data);
        setPreviewImage(require(`../../img/${data.imag}`));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Obtener el archivo de imagen seleccionado
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imag: file.name }); // Guardar el nombre del archivo en producto
        console.log("La imagen cambiada es: ", formData.imag);
        setPreviewImage(reader.result); // Mostrar la imagen como previsualización
      };
      reader.readAsDataURL(file); // Leer el archivo como URL de datos
    }
  };

  // Función para manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  //Función para actualizar producto
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Esta es la imagen ", formData);
    try {
      const config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };
      const response = await fetch(
        "http://localhost:3001/api/products/modify/" + formData._id,
        config
      );
      console.log("respuesta");
      if (!response.ok) {
        throw new Error("Error al actualizar artista");
      }
      alert("Actualización exitosa");
      navigate("/home");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <React.Fragment>
      <Container>
        <Row className="justify-content-center">
          <Col
            xs={10}
            sm={10}
            lg={10}
            xl={10}
            className="d-flex justify-content-center"
          >
            <Form onSubmit={handleSubmit}>
              <h2
                className="text-center mb-3"
                style={{
                  backgroundColor: "#f0f0f0",
                  padding: "5px",
                  borderRadius: "15px",
                  boxShadow: "0 4px 20px rgba(14,14,252,0.2)",
                }}
              >
                <strong style={{ color: "#333", letterSpacing: "1px" }}>
                  Actualizar Artista
                </strong>
              </h2>
              {/* Sección de imagen */}
              <Form.Group className="mb-3">
                {/* Mostrar previsualización de la imagen */}
                {previewImage && (
                  <div className="mt-2 d-flex justify-content-center align-items-center">
                    <div className="pick-image-container border-0">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="circular-image"
                      />
                    </div>
                  </div>
                )}
                <Form.Label>Imagen : {formData.imag}</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Form.Group>

              {/* Resto de los campos */}
              <Form.Group className="mb-3" controlId="name">
                <Row>
                  <Form.Label column xs={3}>
                    Nombre
                  </Form.Label>
                  <Col xs={9}>
                    <Form.Control
                      type="text"
                      placeholder="Nombre del artista"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group className="mb-3" controlId="title">
                <Row>
                  <Form.Label column xs={3}>
                    Título
                  </Form.Label>
                  <Col xs={9}>
                    <Form.Control
                      type="text"
                      placeholder="Título del artista"
                      value={formData.title}
                      onChange={handleInputChange}
                    />
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group className="mb-3" controlId="location">
                <Row>
                  <Form.Label column xs={3}>
                    Ubicación
                  </Form.Label>
                  <Col xs={9}>
                    <Form.Control
                      type="text"
                      placeholder="Ubicación del artista"
                      value={formData.location}
                      onChange={handleInputChange}
                    />
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group className="mb-3" controlId="invitation">
                <Row>
                  <Form.Label column xs={3}>
                    Invitación
                  </Form.Label>
                  <Col xs={9}>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Texto de invitación"
                      value={formData.invitation}
                      onChange={handleInputChange}
                    />
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group className="mb-3" controlId="details">
                <Row>
                  <Form.Label column xs={3}>
                    Detalles
                  </Form.Label>
                  <Col xs={9}>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Detalles adicionales"
                      value={formData.details}
                      onChange={handleInputChange}
                    />
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group className="mb-3" controlId="helpways">
                <Row>
                  <Form.Label column xs={3}>
                    Formas de Ayuda
                  </Form.Label>
                  <Col xs={9}>
                    <Form.Control
                      type="text"
                      placeholder="Formas en que se puede ayudar"
                      value={formData.helpways}
                      onChange={handleInputChange}
                    />
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group className="mb-3" controlId="category">
                <Row>
                  <Form.Label column xs={3}>
                    Categoria
                  </Form.Label>
                  <Col xs={9}>
                    <Form.Select
                      value={formData.category}
                      onChange={handleInputChange}
                    >
                      <option value="ApieCalle">A pie de Calle</option>
                      <option value="EnCampo">En el campo</option>
                      <option value="AyudaAyudar">Ayuda a Ayudar</option>
                    </Form.Select>
                  </Col>
                </Row>
              </Form.Group>

              <Button variant="primary" type="submit">
                Actualizar
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Update;
