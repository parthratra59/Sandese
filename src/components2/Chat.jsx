import React, { useContext } from 'react';
import { auth } from '../Firebase';
import { useNavigate } from 'react-router-dom';
import { ChatContext } from '../Context/ChatContext';
import Messages from "./Messages";
import Input from "./Input";
const Chat = () => {
  const navigate = useNavigate();
  const { data } = useContext(ChatContext);

  const logout = async () => {
    try {
      // promises ke liye hota yh async await ki execute hua toh yus wrna no
      // In computer programming, asynchronous refers to a programming paradigm and execution model where tasks or operations can be executed concurrently or independently of the main program flow. Asynchronous operations allow a program to perform tasks in the background without blocking the execution of other tasks.
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
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