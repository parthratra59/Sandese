import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../Firebase';
import { ChatContext } from '../Context/ChatContext';

const Chats = () => {
  const [chats, setChats] = useState([]); // Initialize with an empty array
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
        const data = doc.data();
        if (data) {
          setChats(data);
        }
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (user) => {
    dispatch({ type: 'CHANGE_USER', payload: user });
  };

  const truncateText = (text, maxLength) => {
    if (text && text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    } else if (text) {
      return text;
    }
    return '';
  };
  
  
  return (
    <>
      <div className='chatcomponent' >
        {chats && Object.entries(chats)
          .sort((a, b) => b[1].date - a[1].date)
          .map((chat) => (
            <div
              className='userchat'
              key={chat[0]}
              onClick={() => handleSelect(chat[1].userInfo)}
            >
              <img src={chat[1].userInfo.photoURL} alt='' />
              <div className='chating'>
                <span>{chat[1].userInfo.displayName}</span>
                <p>{truncateText(chat[1].lastMessage?.text, 20)}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Chats;
