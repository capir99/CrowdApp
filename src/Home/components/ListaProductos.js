import { Container, Row, Col, Button } from "react-bootstrap";
import Producto from "./Producto";
import { useNavigate } from "react-router-dom";

const ListaProductos = ({ productos, setProductos }) => {
  // const [productos, setProductos] = useState([]);

  const navigate = useNavigate();

  //Función enviar el id del producto seleccionado
  const productSel = (e) => {
    const productId = e.currentTarget.getAttribute("data-id");
    navigate(`/Detail/${productId}`);
  };

  return (
    <Container>
      <Row className="justify-content-center">
        {productos.map((prod, index) => (
          <Col key={index} className="mb-4 d-flex justify-content-center">
            <Button
              id={prod._id}
              data-id={prod._id}
              className="card-img-button bg-transparent border-0"
              onClick={productSel}
            >
              <Producto producto={prod} />
            </Button>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ListaProductos;
