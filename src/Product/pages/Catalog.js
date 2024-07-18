// import Menu from "../../Shared/components/Menu";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Image from "react-bootstrap/Image";
import editar from "../../img/svg/edit.svg";
import borrar from "../../img/svg/delete.svg";
import { useNavigate } from "react-router-dom";

const Catalog = () => {
  const navigate = useNavigate();

  //hooks para actualizar lista de productos, producto seleccionado y visibilidad de la pantalla modal
  const [productos, setProductos] = useState([]);
  const [, setproductoSel] = useState([]);
  const [filtro, setFiltro] = useState("");

  //Función para consultar todos los productos
  useEffect(() => {
    async function fetchData() {
      const config = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      if (filtro.length === 0) {
        const response = await fetch(
          "http://localhost:3001/api/products/list",
          config
        );
        const data = await response.json();
        if (data) {
          setProductos(data);
        }
      }
    }
    fetchData();
  });

  //Función para consultar el producto a partir de su id seleccionado desde la tabla
  const productoSeleccion = (e) => {
    async function fetchData() {
      const response = await fetch(
        "http://localhost:3001/api/products/" + e.target.id
      );
      const data = await response.json();
      if (data) {
        setproductoSel(data);
        navigate(`/Update/${data._id}`);
      }
    }
    fetchData();
  };

  //Función para eliminar un producto seleccionado desde la tabla
  const productoEliminar = (e) => {
    async function fetchData() {
      const config = {
        method: "DELETE",
      };
      const response = await fetch(
        "http://localhost:3001/api/productos/remove/" + e.target.id,
        config
      );
      await response.json();
    }
    fetchData();
  };

  //Función para consultar el producto a partir de su código seleccionado desde el campo de entrada superior
  const productoCodeSeleccion = (e) => {
    setFiltro(e.target.value);
    async function fetchData() {
      const response = await fetch(
        "http://localhost:3001/api/productos/search/" + e.target.value
      );
      const datos = await response.json();
      if (datos !== "Producto no encontrado") {
        setProductos(datos);
      } else {
        setProductos([]);
      }
    }
    if (e.target.value) {
      fetchData();
    }
  };

  // Return de componente a renderizar
  return (
    <div>
      <Container>
        <Row className="justify-content-center">
          <Col xs={10} className="d-flex justify-content-center">
            <div className="row justify-content-center">
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
                  Gestión de Artistas
                </strong>
              </h2>
              <Container>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Codigo de producto"
                      onChange={productoCodeSeleccion}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <table
                      id="tbProducto"
                      className="table table-striped col-5 col-s-12"
                    >
                      <thead>
                        <tr>
                          <th scope="col">Id</th>
                          <th scope="col">Nombre</th>
                          <th scope="col">Título</th>
                          <th scope="col">Ubicación</th>
                          <th scope="col">Estado</th>
                          <th scope="col">Acción</th>
                        </tr>
                      </thead>
                      <tbody>
                        {productos.map((producto, index) => {
                          return (
                            <tr key={index + 1}>
                              <td>{producto._id}</td>
                              <td>{producto.name}</td>
                              <td>{producto.title}</td>
                              <td>{producto.location}</td>
                              <td>Activo</td>
                              <td>
                                <table className="table col-5 col-s-12">
                                  <thead></thead>
                                  <tbody>
                                    <tr>
                                      <td>
                                        <Button
                                          id={producto._id}
                                          type="button"
                                          className="btn btn-primary"
                                          onClick={productoSeleccion}
                                        >
                                          <Image
                                            src={editar}
                                            className="action-image"
                                            id={producto._id}
                                          />
                                        </Button>
                                      </td>

                                      <td>
                                        <Button
                                          type="button"
                                          className="btn btn-primary"
                                          onClick={productoEliminar}
                                        >
                                          <Image
                                            src={borrar}
                                            className="action-image"
                                            id={producto._id}
                                          />
                                        </Button>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </Form.Group>
                </Form>

                <Row>
                  <Col xs={1}></Col>
                </Row>
              </Container>
            </div>
          </Col>
        </Row>
      </Container>

      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Código</Form.Label>
              <Form.Control
                type="text"
                placeholder={productoSel.code}
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={productoSel.name}
                name="name"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={productoSel.desc}
                name="desc"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Valor</Form.Label>
              <Form.Control
                type="text"
                value={productoSel.value}
                name="value"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Existencias</Form.Label>
              <Form.Control
                type="text"
                value={productoSel.quantity}
                name="quantity"
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={() => productoActualizar(productoSel._id)}
          >
            Guardar
          </Button>
        </Modal.Footer>
      </Modal> */}
    </div>
  );
};

export default Catalog;
