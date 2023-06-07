import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import "./style.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { Authorization } from "./Context/AuthContext";
import PasswordReset from "./components/PasswordReset";

function App() {
  const { currentUser } = useContext(Authorization);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="passwordreset" element={<PasswordReset />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
