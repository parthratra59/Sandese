import React, { useContext,useState,useEffect } from 'react';
import { auth } from '../Firebase';
import { useNavigate } from 'react-router-dom';
import { ChatContext } from '../Context/ChatContext';
import Messages from "./Messages";
import Input from "./Input";
import toast from 'react-hot-toast';
import './Chat.css';
import Sidebar from './Sidebar';
const Chat = () => {
  const navigate = useNavigate();
  const { data } = useContext(ChatContext);
  const [showSidebar, setShowSidebar] = useState(false);

  const logout = async () => {
    try {
      // promises ke liye hota yh async await ki execute hua toh yus wrna no
      // In computer programming, asynchronous refers to a programming paradigm and execution model where tasks or operations can be executed concurrently or independently of the main program flow. Asynchronous operations allow a program to perform tasks in the background without blocking the execution of other tasks.
      await auth.signOut();
      toast.success('Logout Successful');
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };


 const back=()=>{
   return <Sidebar/>
 }
 const toggleSidebar = () => {
  setShowSidebar(!showSidebar);
};


  return (
    <>
      <div className='chat' >
        <div className='chatinfo'>

          <span style={{ color: 'white', fontWeight: 'bold',fontSize:'20px' }}>{data.user?.displayName}</span>  
          
         

          <div className='chaticons'>
           
            <button onClick={logout} style={{ background: '#e27396' }}>Logout</button>
          </div>
        </div>
        {/* Render your Messages and Input components here */}
        <Messages />
       
      <Input/>

      </div>
    </>
  );
};  

export default Chat;