import React from 'react'
import Sidebar from '../components2/Sidebar'
import Chat from '../components2/Chat'
import '../style.scss'
const Home = () => {
  return (
    <>
    <div className='home'>
        <div className='inside-home'>
        {/* {console.log('hh')} */}
            <Sidebar/>
            <Chat/>
        </div>
    </div>
    </>
  )
}

export default Home