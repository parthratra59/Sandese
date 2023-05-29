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

  const {currentuser}= useContext(Authorization)

  console.log(currentuser)




  // ab agr jb tk login nhi hai toh chat vala page nhi deikhega
  // protected route krdiya

  const Protectedroute=({children})=>{
    if(!currentuser)
    {
     return <Navigate to='/login'/>
    }
    return children;
  }
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/">
          <Route
             index element={
              // <Protectedroute>
                <Home />
              // </Protectedroute>
            }
          />
        <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App