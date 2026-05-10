import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./config/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="acip-root">
          <AppRoutes />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
