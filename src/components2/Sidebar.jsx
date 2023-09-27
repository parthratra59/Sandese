import React from 'react'
import Navbar from './Navbar'
import Searchbar from './Searchbar'
import Chats from './Chats'

// import '../style.scss'
import './Sidebar.css'
const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Navbar/>
      <Searchbar/>
      <Chats/>
    </div>
  )
}

export default Sidebar