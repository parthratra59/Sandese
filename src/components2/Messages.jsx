import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../Context/ChatContext";
import { db } from "../Firebase";
import Message from "./Message";
import { BiMessageX } from 'react-icons/bi';
// import { GlobalContext2 } from "../components/Home"
import "./Messages.css"

const Messages = () => {
  // const { chat, setChat } = useContext(GlobalContext2);
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);


  console.log(messages)
  const hi = () => {
    setVisible(!visible);
  }

  return (
    <div className="messages">

    {/* for this error Cannot read properties of undefined (reading 'length')
TypeError: Cannot read properties of undefined (reading 'length')
     */}

    {/* Additionally, you can add a null check before accessing the messages array in the JSX code. You can use the && operator to conditionally render the messages only if messages is not null or undefined. Here's an example: */}
      { messages && messages.length === 0 ? (
        <div className="nouser" k={hi} >
          <BiMessageX style={{ color: '#e27396', fontSize: '150px' }} className="pakistan"/>
          <p style={{ fontSize: '40px', color: '#e27396' }} className="kit">No Chat Selected</p>
        </div>

      ) : (
        messages?.map((kuchbhilikhdo) => (
          <Message message={kuchbhilikhdo} key={kuchbhilikhdo.id} />
          
        ))
        
        )}

    </div>
  );
        }  
export default Messages;


// if else in react
// {
//   (() => {
//     if (!messages) {
//       return <p>No messages available.</p>;
//     } else {
//       return messages.map((m) => (
//         <Message message={m} key={m.id} />
//       ));
//     }
//   })()
// }