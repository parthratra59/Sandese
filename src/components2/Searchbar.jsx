import React, { useState } from 'react';
import {   collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,} from 'firebase/firestore';
import { db } from '../Firebase';
import { Authorization } from '../Context/AuthContext';
import { useContext } from 'react';

const Searchbar = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(Authorization);
  // koi bbhi hook function ke andr nhi rhege bhar rhete hia
  const handleSearch = async () => {
    // const { currentUser } = useContext(Authorization);
  
  // docs se uthaya hai firestore ke query se
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


  const handleselect=async()=>{
    // check whether group is exist is not
//     Uniqueness: The combined ID ensures that there is only one chat between any two users.
// Identification: The combined ID makes it easy to identify a chat, even if it is not currently open.
// Prevention of duplicate chats: The combined ID prevents users from accidentally creating duplicate chats.
const combinedId =
currentUser.uid > user.uid
  ? currentUser.uid + user.uid
  : user.uid + currentUser.uid;

    // mai check kr rha hu user collection mai hai ky element
    try{
      
// The doc function in the code you have provided is a function that creates 
// a document reference. A document reference is a unique identifier for a document in
//  a Firestore collection. The doc function takes two arguments: the name of the collection 
//  and the ID of the document. In the code you have provided, the doc function is being used to 
//  create a document reference to the chat document with the combined ID of the two users.

// The getDocs function is then used to get the document that the document reference refers to. The getDocs function takes a single argument, which is an array of document references. In the code you have provided, the getDocs 
// function is being used to get the chat document with the combined ID of the two users.

// The res variable is then assigned the result of the getDocs function. The res variable is a DocumentSnapshot object, which contains information about the document that was retrieved.
  const res= await getDoc(doc(db,"chats",combinedId))
  // if() isliye likha agr unke bich mai baat nhi nhui hai abhi tk then
  if(!res.exists())
  {
    // create a chats in chats collection
    await setDoc(doc(db,'chats',combinedId),{message:[]})
    // maine phelese getdocs kra tha toh chl nhi rha tha reason yh hai 
    // getDocs is used to retrieve a collection of documents. It takes a query object as its argument, which specifies the criteria for the documents to be retrieved. For example, you could use a query to retrieve all documents in a collection that were created after a certain date.
    // getDoc is used to retrieve a single document. It takes a document reference as its argument, which identifies the document to be retrieved. For example, you could use a document reference to retrieve the document with the ID "myDocumentId".
    
    // userchats:{
        // agr parth rhe rha id:
        // {combined id :  mai dispalyname,image,id chaiye 
          
        // }
        // last message bhi show hona chaiye bnade ka like wahtsappp pr hota


  // --------------------------------------*********************************----------------
        // firestore se nested object utha rha  jo upr maine kiya 
        // Update fields in nested objects
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]:
          // use string and variable
           {

            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
          // servertimestamp firebase se liya hai calculates time zone and time
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });


    }
  }
    catch(err)
    {

    }
    setUser(null)
    setUsername("")
  }
  
    

  return (
    <div className='search'>
      <div className='searchForm'>
        <input
          type='text'
          placeholder='Find a user'
          // className='blinking-placeholder'
          style={{ paddingLeft: '10px' }}
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          // onKeyDown={handleKey}
        />
      </div>
      {err && <span>User not found</span>}
      
      {user && (<div className='userchat' onClick={handleselect}>
          <img src={user.photoURL} alt='' />
          <div className='chating'>
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};


export default Searchbar
