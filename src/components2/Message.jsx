import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { ChatContext } from '../Context/ChatContext';





const Message = ({ message }) => {

  // const{setChat}=useContext(GlobalContext2)
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const[starting,settime]=useState('just now')
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    
  }, [message]);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.replace(/(.{39})/g, '$1\n');
    }
    return text;
  };
// duration se kuch milta khulta hota toh set interval nikalte
useEffect(() => {
  const time = setInterval(() => {
    settime(calculateMinutesElapsed());
  }, 60000);

  return () => {
    clearInterval(time);
  };
}, []);



  const calculateMinutesElapsed = () => {
    const now = new Date();
    const sentDate = message.date.toDate();
    const diff = Math.floor((now - sentDate) / (1000 * 60)); // Calculate the difference in minutes
    
   
    if (  diff < 60) {
      return diff + ' min'; // Return the minutes if less than 60
    } else {
      const hours = Math.floor(diff / 60); // Calculate the hours
      return hours + " hr"; // Return the hours
    }
  };

  const[visible,setVisible]=useState(false)

  useEffect(()=>{
    const keyhandler=(e)=>{
      if(e.key==="Escape"){
        setVisible(true)
      }

    }
    window.addEventListener("keydown",keyhandler)

    return ()=>{
      window.removeEventListener("keydown",keyhandler)
    }
  },[])


  return (
  
      <>
      <div
        ref={ref}
        className={`message ${message.senderId === currentUser.uid && 'owner'}`}
      >
        <div className="messageInfo">
          <img
            src={
              message.senderId === currentUser.uid
                ? currentUser.photoURL
                : data.user.photoURL
            }
            alt=""
          />
          {/* hm hmesha jo change hone vala hota vo likhte hai */}
          <span>{starting}</span>
        </div>
        <div className="messageContent">
          {/* message.img props pass hua hai */}
          {message.img && <img src={message.img} alt="" />}
          <p style={{ whiteSpace: 'pre-wrap' }}>{truncateText(message.text, 39)}</p>
        </div>
      </div>
      </>
    )
}

export default Message;
