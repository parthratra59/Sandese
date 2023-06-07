 import React, { useContext, useEffect, useState } from 'react'
import { Authorization } from '../Context/AuthContext';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../Firebase';
import {ChatContext}from '../Context/ChatContext';
//  import '../style.scss'

 const Chats = () => {
  // fetching chats from firebase
  // realtime se uthaya

    const [chats,setchats]=useState([]);
    const {currentUser}=useContext(Authorization);
    const {dispatch}=useContext(ChatContext)
    useEffect(() => {
      // fetching ka kaam aya useeffect use hua
      const getchats=()=>{
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {

        const data = doc.data();
        // agr yh nhi krege toh error dega because data null hai 
        if (data) {
          setchats(data);
        }
        // console.log(source, " data: ", doc.data());
      });
      
      return () => {
        unsub();
      }
    };
    // agr yh nhi likhege 
     // agr yh nhi krege toh error dega because data null hai 
    currentUser.uid && getchats();
    }, [currentUser.uid]);
    // array[2] ke form mai dikhega  phela index chat id dikhaega nd 2nd object display name vgrh
    // console.log(Object.entries(chats));
    const handleselect=(u)=>{
      dispatch({type: "CHANGE_USER",payload:u})
    }
return(
    <>
     <div className='chatcomponent'>
     {Object.entries(chats)?.map((chat)=>(
      /* chat 0 id user ki deti hai  */
        <div className='userchat' key={chat[0]} onClick={()=>handleselect(chat[1].userInfo)}>
        <img src={chat[1].userInfo.photoURL} alt=''/>
        <div className='chating'>
          <span>
            {chat[1].userInfo.displayName }
          </span>
          <p>{chat[1].userInfo.lastMessage?.text}</p>
        </div>
      </div>
      ))}
    </div>
    
    </>
   )
 }
 
 export default Chats