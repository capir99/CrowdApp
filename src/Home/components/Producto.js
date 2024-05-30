import { Card } from "react-bootstrap";
import location_logo from "../../img/icons/location.png";
import star_logo from "../../img/icons/star.png";

const Producto = ({ producto }) => {
  let imageUrl;
  imageUrl = require(`../../img/${producto.imag}`);
  return (
    <div>
      <Card className="card-container">
        <Card.Img variant="top" src={imageUrl} className="card-img" />
        <Card.Body>
          <Card.Title className="card-title">
            {producto.name} "{producto.title}"
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            <img src={location_logo} alt="Location Icon" /> {producto.location}{" "}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            <img src={star_logo} alt="Star Icon" /> {producto.likes}{" "}
          </Card.Subtitle>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Producto;
