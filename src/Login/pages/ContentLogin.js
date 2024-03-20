import logo from "../../logo.PNG";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

const ContentLogin = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <form className="form-signin text-center">
        <img className="mb-4" src={logo} alt="" width="100" height="100" />
        <p className="h4 mb-3 fw-normal">Transformamos la forma de ayudar</p>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Usuario"
          />
          <label htmlFor="floatingInput">Usuario</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label htmlFor="floatingPassword">Contraseña</label>
        </div>

        <Button className="w-100 btn btn-lg btn-primary" type="submit">
          Ingresar
        </Button>
        <p className="mt-5 mb-3 text-muted">&copy; NanaPass-2024</p>
      </form>
    </div>
  );
};

export default ContentLogin;
