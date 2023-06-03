import React, { useContext } from 'react'
import Register from './components/Register'
import './style.scss'
import Login from './components/Login'
import Home from './components/Home'
// import { Authorization } from './Context/AuthContext'
import {
  BrowserRouter ,
  Switch,
  Route,
  Link,
  Routes,
  Navigate
} from "react-router-dom";
import { Authorization } from './Context/AuthContext'

// import Login from './components/Login'
const App = () => {

  const { currentUser } = useContext(Authorization);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children
  };

  
  return (
    <BrowserRouter>
      <Routes>
        <Route >
          <Route
            index
            element={
              <ProtectedRoute >
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App