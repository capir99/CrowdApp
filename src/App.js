import "./css/app.css";
import ContentLogin from "./Login/pages/ContentLogin";
import Error from "./Shared/pages/Error";

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
          <Route path="/" element={<ContentLogin />} />
          <Route path="/error" element={<Error />} />
          <Route path="*" element={<Navigate to="/error" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
