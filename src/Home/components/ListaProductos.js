import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ima1 from "../../img/prod5.PNG";
import ima2 from "../../img/prod6.PNG";
import ima3 from "../../img/prod7.PNG";
import ima4 from "../../img/prod8.PNG";
import ima5 from "../../img/prod9.PNG";
import ima6 from "../../img/prod10.PNG";

import Producto from "./Producto";

const ListaProductos = () => {
  const productos = [
    {
      id: 1,
      imag: ima1,
      name: "Lucia, Sara y Antonio",
      title: "Grupo Alcantara",
      location: "Plaza Mayor",
      likes: "34",
    },
    {
      id: 2,
      imag: ima2,
      name: "Paco y Martín",
      title: "Gipsy Soul",
      location: "La latina",
      likes: "12",
    },
    {
      id: 3,
      imag: ima3,
      name: "Pablo",
      title: "PinArtarte",
      location: "Plaza Mayor",
      likes: "123",
    },
    {
      id: 4,
      imag: ima4,
      name: "María y Cervero",
      title: "StopArt",
      location: "Plaza Mayor",
      likes: "72",
    },
    {
      id: 5,
      imag: ima5,
      name: "Inocencio",
      title: "Viva Mexico",
      location: "La Gran Via",
      likes: "34",
    },
    {
      id: 6,
      imag: ima6,
      name: "Esteban",
      title: "Alejandro Rios",
      location: "Puerta del Sol",
      likes: "44",
    },
  ];

  return (
    <Container>
      <Row xs={1} md={2} lg={3} xl={4} xxl={4}>
        {" "}
        {/* Definir el número de columnas según el tamaño de la pantalla */}
        {productos.map((producto, index) => (
          <Col key={index}>
            <Link to={`/Detailcard`}>
              <Button
                id={producto._id}
                className="card-img-button bg-transparent border-0"
              >
                <Producto producto={producto} />
              </Button>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ListaProductos;
