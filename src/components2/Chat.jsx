import React from 'react'
// import Cam from '../image/cam-recorder.png'
// import video from '../images/video.png'
import Messages from './Messages'
import Input from './Input'
import { signOut } from 'firebase/auth'
import { auth } from '../Firebase'
const Chat = () => {
  return (
    <>
    <div className='chat'>
      <div className='chatinfo'>
        <span style={{ color: '#E0E1E3', fontWeight: 'bold' }}>Virat</span>
        <div className='chaticons'>
          {/* <img src={} alt=''/> */}
          <button onClick={()=>signOut(auth)}>Logout</button>
        </div>
       
      </div>
      <Messages/>
      <Input/>
    </div>
    </>
  )
}

export default Chat