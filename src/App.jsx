import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import "./style.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
import PasswordReset from "./components/PasswordReset";
import ResetPage from "./components/ResetPage";
import Sidebar from "./components2/Sidebar";

// import Emptychats from "./components2/Emptychats";

function App() {
  const { currentUser } = useContext(AuthContext);


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
          <Route path="resetpage" element={<ResetPage />} />
          {/* <Route path="empty" element={<Emptychats />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
