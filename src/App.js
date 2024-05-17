import "./css/app.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Detail from "./Card/pages/Detail";
import Home from "./Home/pages/Home";
import Error from "./Shared/pages/Error";
import CreateProducto from "./Product/pages/Create";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/Detail" element={<Detail />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Create" element={<CreateProducto />} />
          <Route path="/" element={<Home />} />
          <Route path="/error" element={<Error />} />
          <Route path="*" element={<Navigate to="/error" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
