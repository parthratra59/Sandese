import React from 'react'
// import Cam from '../image/cam-recorder.png'
// import video from '../images/video.png'
import Messages from './Messages'
import Input from './Input'

import { auth } from '../Firebase'
import { Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
// import { browserHistory } from 'react-router';
const Chat = () => {
  const navigate = useNavigate();

  function logout() {
    localStorage.clear();

    navigate("/login");
  }

  return (
    <>
      <div className='chat'>
        <div className='chatinfo'>
          <span style={{ color: '#E0E1E3', fontWeight: 'bold' }}>Virat</span>
          <div className='chaticons'>
            {/* <img src={} alt=''/> */}
            <button onClick={logout}>Logout</button>
          </div>
        </div>
        <Messages/>
        <Input/>
      </div>
    </>
  );
}

export default Chat