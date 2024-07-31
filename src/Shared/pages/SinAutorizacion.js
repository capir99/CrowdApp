import { useNavigate } from "react-router-dom";
import restringido from "../../assets/restringido.svg";
import Button from "react-bootstrap/Button";

const SinAutorizacion = () => {
  const navigate = useNavigate();
  return (
    <div className="d-flex justify-content-center mt-5">
      <img className="mb-4" src={restringido} alt="" width="300" height="100" />
      <div>
        <h1>Sin autorización</h1>
        <h3>Por favor contactar al adminsitrador para validar sus permisos</h3>
        <span className="tag">nanapass@gmail.com</span>
        <br />
        <br />
        <div>
          <Button
            variant="primary"
            onClick={() => {
              navigate(-1); // Regresa a la página anterior
            }}
          >
            Regresar al sitio
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SinAutorizacion;
