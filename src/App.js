import "./css/app.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Detail from "./Card/pages/Detail";
import Home from "./Home/pages/Home";
import Error from "./Shared/pages/Error";
import CreateProduct from "./Product/pages/Create";
import UpdateProduct from "./Product/pages/Update";
import ProductCatalog from "./Product/pages/Catalog";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const stripePromise = loadStripe(
    "pk_test_51PYebbDujtx63ft0eF7xGn86AtB6MkXeQE5QSFmlTrrDA0mWJEQ3HSBOu1hudKkVrTjB3pnYFz1Wd80e7PpiMqlU00sGIgxCga"
  );

  return (
    <div className="App">
      <Elements stripe={stripePromise}>
        <Router>
          <Routes>
            <Route path="/Detail" element={<Detail />} />
            <Route path="/Detail/:id" element={<Detail />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Create" element={<CreateProduct />} />
            <Route path="/Catalog" element={<ProductCatalog />} />
            <Route path="/Update/:id" element={<UpdateProduct />} />
            <Route path="/" element={<Home />} />
            <Route path="/error" element={<Error />} />
            <Route path="*" element={<Navigate to="/error" />} />
          </Routes>
        </Router>
      </Elements>
    </div>
  );
}

export default App;
