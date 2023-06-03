import React from 'react'
// import './style.scss'
import Add from '../image/ava.png'
import eyesclose from '../image/eye-close.png'
import eyesopen from '../image/eye-open.png'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth,db, storage } from '../Firebase'
import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// is se maine collection  bnaaya doc vale se
import { doc, setDoc } from "firebase/firestore"; 
import { Link, Navigate, useNavigate } from 'react-router-dom';
const Register = () => {
    const [err, setErr] = useState(false);
    const [passwordvisible,setPasswordVisible]=useState(false)
    const [eyeIconSrc, setEyeIconSrc] = useState(eyesclose);
    // starting mai nhi hai visible
    let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  const [avatarSelected, setAvatarSelected] = useState(false);
    const handlepassword =()=>{
      // setPasswordVisible(!passwordvisible);
      setPasswordVisible(!passwordvisible);
    setEyeIconSrc(passwordvisible ? eyesclose : eyesopen);
    }

    const navigate=useNavigate()
    const handleSubmit= async(e)=>{
        e.preventDefault();
        // console.log(e.target[0].value)
        const displayName=e.target[0].value;
         email=e.target[1].value;
         password=e.target[2].value;  
        const file=e.target[3].files[0];

        try{
       const res= await createUserWithEmailAndPassword(auth, email, password)
        const storageRef = ref(storage, displayName);
        const uploadTask = uploadBytesResumable(storageRef, file);

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on(
  (error) => {
    setErr(true);
  }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
      await updateProfile(res.user,{
        displayName,
        photoURL:downloadURL,
      });
      // user collection hai idhr
      await setDoc(doc(db,"users",res.user.uid),{
        uid: res.user.uid,
        displayName,
        email,
        photoURL: downloadURL
          });

          await setDoc(doc(db, "userChats", res.user.uid), {});
          navigate("/login");
    });
  }
);
// making collection
// password isliye nhi kr rhe because baki log dekhege
setAvatarSelected(true); 
 } catch (err) {
  console.log(err.message);
  setErr(true);
}


}   
// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in 
//     const user = userCredential.user;
//     console.log(user);
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });
const handlePasswordChange = (e) => {
  const password = e.target.value;
  setPassword(password);
  validatePassword(password);
  // Perform any necessary logic based on password validity
};
const validatePassword = (password) => {
  // Regular expression to validate the password
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Check if the password matches the regex pattern
  return regex.test(password);
};

const handleEmailChange = (e) => {
  setEmail(e.target.value);
  isEmailValid(e.target.value)
};



const isEmailValid = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email) && email.includes('@');
};

  return (
    <>
        <div className='form-container'>
            <div className='formWrapper'>
                <span className='logo'>Sandese App</span>
                <span className='title'>Register</span>
            <form className='forming' onSubmit={handleSubmit}>
                <input type='text' placeholder='display name' required/>
                <input type='email' placeholder='email' required onChange={handleEmailChange}/>
                <div className='eyebutton' style={{display:'flex',alignItems:'center'}} >
                <input type={passwordvisible ? 'text' : 'password'} placeholder='password' id='password' required onChange={handlePasswordChange}/>
                <img src={eyeIconSrc} id='eyeicon' onClick={handlepassword}/>
                </div>
                {/* <input type='text' placeholder=''/> */}
                <input style={{display:'none',border:'none' }} type='file' id='file'/>
                <label htmlFor='file'>
                    <img src={Add} alt='' required/>
                    <span>Add an avatar</span>
                </label>
                 
                <button >Sign Up</button>
                {avatarSelected ? (
            <span style={{color:'#AEBAC1'}}>Avatar selected</span>
          ) : (
            <span style={{color:'#AEBAC1'}}>No avatar selected</span>
          )}

        
                {/* error agya toh something went wrong ajaega */}
                {err && <span>Something went wrong</span>}
            </form>

            {!err && (
              <p>
                Password must contain:
                <ul>
                  <li className={validatePassword() ? 'valid' : ''}>
                    At least one uppercase letter
                  </li>
                  <li className={validatePassword() ? 'valid' : ''}>
                    At least one lowercase letter
                  </li>
                  <li className={validatePassword() ? 'valid' : ''}>
                    Minimum 8 characters
                  </li>
                  <li className={validatePassword() ? 'valid' : ''}>
                    At least one digit
                  </li>
                  <li className={validatePassword() ? 'valid' : ''}>
                    At least one special character
                  </li>
                </ul>
              </p>
            )}
            <p>Already Registered ? <Link style={{color:'#e27396' ,textDecoration: 'none',fontWeight:'bold' }} to="/Login">Login</Link></p>
        </div>
        </div>
     
    </>
  )
}



export default Register