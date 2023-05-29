import React, { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../Firebase';
import { Authorization } from '../Context/AuthContext';
import { useContext } from 'react';

const Searchbar = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const handleSearch = async () => {
    // const { currentUser } = useContext(Authorization);
  
  
    const q = query(collection(db, 'users'), where('displayName', '==', username));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  
  const handleKey = (e) => {
    e.code === 'Enter' && handleSearch();
  };


  // const handleSelect= async()=>{
    // check wheather the group(chats in firestore),if not create
    // create user chats
  
    

  return (
    <div className='search'>
      <div className='searchForm'>
        <input
          type='text'
          placeholder='Find a user'
          className='blinking-placeholder'
          style={{ paddingLeft: '10px' }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKey}
        />
      </div>
      {err && <span>User not found</span>}
      {user && (
        <div className='userchat'>
          {user.photoURL && <img src={user.photoURL} alt='' />}
          <div className='chating'>
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};


export default Searchbar
