import React from 'react'
import { useContext } from 'react'
import { auth } from '../Firebase'
import { Authorization } from '../Context/AuthContext'
// import '../style.scss'

const Navbar = () => {

  const {currentUser} =useContext(Authorization)
  return (
    <div className='navbar'>
    <span className='Logo'>Sandese App</span>
    <div className='right'>
        <img src= {currentUser.photoURL}alt=''/>
        {/* </img> */}
        <span style={{fontWeight:"bold"}}>{currentUser.displayName}</span>
        {/* <button>Logout</button> */}
    </div>
    </div>
  )
}

export default Navbar