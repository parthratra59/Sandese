import React,{createContext,useState} from 'react'
import Sidebar from '../components2/Sidebar'
import Chat from '../components2/Chat'
import '../style.scss'
export const GlobalContext2 = createContext({});
const Home = () => {

  // const[chat,setChat]=useState(false)
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