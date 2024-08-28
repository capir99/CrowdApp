import "./css/app.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./Login/pages/Singup";
import EmailVerification from "./Login/pages/EmailVerification";
import Terms from "./Shared/pages/Terms";
import Detail from "./Product/pages/Detail";
import Home from "./Home/pages/Home";
import Error from "./Shared/pages/Error";
import SuccessPage from "./Product/components/SuccessPage";
import CancelPage from "./Product/components/CancelPage";
import SinAutorizacion from "./Shared/pages/SinAutorizacion";
import CreateProduct from "./Product/pages/Create";
import UpdateProduct from "./Product/pages/Update";
import ProductCatalog from "./Product/pages/Catalog";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Función para obtener el rol del usuario
const useUserRole = () => {
  const rol = localStorage.getItem("user-rol");
  return rol ? rol.replace(/^"(.*)"$/, "$1") : null;
};

// Función para obtener el estado del usuario
const useUserState = () => {
  const state = parseInt(localStorage.getItem("user-state"), 10);
  return isNaN(state) ? null : state;
};

// Componente que maneja la autorización
const ProtectedRoute = ({ element, roleRequired, stateRequired }) => {
  const role = useUserRole();
  const state = useUserState();

  // Asegurarse de que el rol y el estado están definidos y compararlos con los requeridos
  if (role === roleRequired && state === stateRequired) {
    return element;
  } else {
    return <Navigate to="/SinAutorizacion" replace />;
  }
};

function App() {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PROMISE);

  return (
    <div className="App">
      <ToastContainer />
      <Elements stripe={stripePromise}>
        <Router>
          <GoogleOAuthProvider
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          >
            <Routes>
              <Route path="/Signup" element={<Signup />} />
              <Route path="/verify-email" element={<EmailVerification />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/cancel" element={<CancelPage />} />
              <Route path="/Detail" element={<Detail />} />
              <Route path="/Detail/:id" element={<Detail />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/Update/:id" element={<UpdateProduct />} />
              <Route path="/success" element={<SuccessPage />} />
              <Route path="/" element={<Home />} />
              <Route path="/error" element={<Error />} />
              <Route path="*" element={<Navigate to="/error" />} />
              <Route path="/SinAutorizacion" element={<SinAutorizacion />} />
              <Route
                path="/Create"
                element={
                  <ProtectedRoute
                    element={<CreateProduct />}
                    roleRequired="us-admin"
                    stateRequired={1}
                  />
                }
              />
              <Route
                path="/Catalog"
                element={
                  <ProtectedRoute
                    element={<ProductCatalog />}
                    roleRequired="us-admin"
                    stateRequired={1}
                  />
                }
              />
            </Routes>
          </GoogleOAuthProvider>
        </Router>
      </Elements>
    </div>
  );
}

export default App;
