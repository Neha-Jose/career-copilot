import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./config/AppRoutes";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="acip-root">
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
