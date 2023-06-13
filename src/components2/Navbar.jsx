import React from 'react'
import { useContext } from 'react'
import { auth } from '../Firebase'
import { AuthContext } from '../Context/AuthContext'
// import '../style.scss'

const Navbar = () => {

  const {currentUser} =useContext(AuthContext)
  return (
    <div className='navbar'>
    <span className='Logo'>Sandese App</span>
    <div className='right'>
        <div className='imaging'>
        <img src= {currentUser.photoURL}alt='' />
        </div>
        {/* </img> */}
        <span style={{fontWeight:"bold",color: 'white'}}>{currentUser.displayName}</span>
        {/* <button>Logout</button> */}
    </div>
    </div>
  )
}

export default Navbar