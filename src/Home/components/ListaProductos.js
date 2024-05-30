import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Producto from "./Producto";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ListaProductos = () => {
  const [productos, setProductos] = useState([]);
  const [prodSel, setprodSel] = useState(0);
  const navigate = useNavigate();

  //Función para consultar todos los productos
  useEffect(() => {
    async function fetchData() {
      try {
        const config = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await fetch(
          "http://localhost:3001/api/products/list",
          config
        );
        const data = await response.json();
        if (data) {
          setProductos(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  //Función enviar el id del producto seleccionado 
  const productSel = (e) => {
    const productId = e.currentTarget.getAttribute('data-id');
    navigate(`/Detail/${productId}`);
  };

  return (
    <Container>
      <Row xs={1} md={2} lg={3} xl={4} xxl={4}>
        {" "}
        {/* Definir el número de columnas según el tamaño de la pantalla */}
        {productos.map((prod, index) => (
          <Col key={index}>
            {/* <Link to={{ pathname: "/Detail", state: { producto: productSel } }}> */}
            <Button
              id={prod._id}
              data-id={prod._id}
              className="card-img-button bg-transparent border-0"
              onClick={productSel}
            >
              <Producto producto={prod} />
            </Button>
            {/* </Link> */}
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ListaProductos;
