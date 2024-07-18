import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Row, Col, Image } from "react-bootstrap";
import pickImage from "../../img/icons/pick.PNG";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Update = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [previewImage, setPreviewImage] = useState(pickImage); // Estado para previsualizar la imagen

  // Estado para almacenar los valores del formulario
  const [producto, setproducto] = useState({
    imag: "",
    name: "",
    title: "",
    location: "",
    invitation: "",
    details: "",
    helpways: "",
    likes: "0", // Inicializado en 0, por ejemplo
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
        setproducto(data);
        // setPreviewImage(require(`../../img/${producto.imag}`));
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error state or show a message to the user
      }
    }
    fetchData();
  }, [id, producto.imag]);

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Obtener el archivo de imagen seleccionado
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setproducto({ ...producto, imag: file.name }); // Guardar el nombre del archivo en producto
        setPreviewImage(reader.result); // Mostrar la imagen como previsualización
      };
      reader.readAsDataURL(file); // Leer el archivo como URL de datos
    }
  };

  // Función para manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setproducto({
      ...producto,
      [id]: value,
    });
  };

  //Función para registtrar producto
  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(producto),
    };
    try {
      const response = await fetch(
        "http://localhost:3001/api/products/add/",
        config
      );
      if (!response.ok) {
        throw new Error("Error al agregar artista");
      }

      alert("Registro exitoso");
      navigate("/home");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //  //Función para actualizar producto editado a partir de la pantalla modal
  //  const productoActualizar = (id) => {
  //   async function fetchData() {
  //     const config = {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(productoSel),
  //     };
  //     await fetch("http://localhost:3001/api/productos/modify/" + id, config);
  //   }
  //   fetchData();
  // };

  return (
    <React.Fragment>
      <Container>
        <Row className="justify-content-center">
          <Col xs={10} className="d-flex justify-content-center">
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
                      <Image
                        src={previewImage}
                        alt="Preview"
                        fluid
                        className="pick-image circular-image"
                      />
                    </div>
                  </div>
                )}
                <Form.Label>Seleccionar Imagen</Form.Label>
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
                      value={producto.name}
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
                      value={producto.title}
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
                      value={producto.location}
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
                      value={producto.invitation}
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
                      value={producto.details}
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
                      value={producto.helpways}
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
                      value={producto.category}
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
