import React from 'react'
// import './style.scss'
import { useEffect } from 'react'
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
import {RiLockPasswordFill} from 'react-icons/ri'
const Register = () => {
    const [err, setErr] = useState(false);
    const [passwordvisible,setPasswordVisible]=useState(false)
    const [eyeIconSrc, setEyeIconSrc] = useState(eyesclose);

    const [loading, setLoading] = useState(false);
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
      setLoading(true);
        e.preventDefault();
        // console.log(e.target[0].value)

        const displayName=e.target[0].value;
         email=e.target[1].value;
         password=e.target[2].value;  
        const file=e.target[3].files[0];
          // files images vgrh storage mai hote hai 
          // isliye upload vale docs se liya firebase ke
        try {
                    // sb firebase se liya hai upload file storage se
          const res = await createUserWithEmailAndPassword(auth, email, password);
          
          // ab vo object not found ht gya error ab uniquly identify hone lga
          const date = new Date().getTime();
          const storageRef = ref(storage, `${displayName + date}`);
    
          await uploadBytesResumable(storageRef, file).then(() => {
            getDownloadURL(storageRef).then(async (downloadURL) => {
              try {
                await updateProfile(res.user, {
                  displayName,
                  photoURL: downloadURL,
                });
                // create user collection hai 
                await setDoc(doc(db, "users", res.user.uid), {
                  uid: res.user.uid,
                  displayName,
                  email,
                  photoURL: downloadURL,
                });
                // uid ,phourl jaise terms conole mai the  jb inspect kiya tha vhs se liye hai
                 // create user collection hai 
                 //create empty user chats on firestore
                await setDoc(doc(db, "userChats", res.user.uid), {});
                 // {} isliye hai ki abhi register kiya toh kaise koi baat hogi kisi ki});
                navigate("/");
              } catch (error) {
                console.log(error.message);
                setErr(true);
                setLoading(false);
              }
            });
          });
    
          setAvatarSelected(true);
        } catch (err) {
          console.log(err.message);
          setErr(true);
          setLoading(false);
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
  validatePassword(password)
};
const validatePassword = (password) => {
  // Regular expression to validate the password
  
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Check if the password matches the regex pattern
  return regex.test(password);
};

const handleEmailChange = (e) => {
  setEmail(e.target.value);
 
};
const requirements = [
  { regex: /.{8,}/, index: 0 },
  { regex: /[0-9]/, index: 1 },
  { regex: /[a-z]/, index: 2 },
  { regex: /[^A-Za-z0-9]/, index: 3 },
  { regex: /[A-Z]/, index: 4 },
];





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
            <input type={passwordvisible ? 'text' : 'password'} placeholder='password' id='password' value={password} required onChange={handlePasswordChange}/>
            <img src={eyeIconSrc} id='eyeicon' onClick={handlepassword}/>
          </div>
          <input style={{display:'none',border:'none' }} type='file' id='file'/>
          <label htmlFor='file'>
            <img src={Add} alt='' required/>
            <span>Add an avatar</span>
          </label>
          <button>Sign Up</button>
          {avatarSelected ? (
            <span style={{color:'#AEBAC1'}}>Avatar selected</span>
          ) : (
            <span style={{color:'#AEBAC1'}}>No avatar selected</span>
          )}
          {err && <span>Something went wrong</span>}
        </form>
        {!err && (
          <div>
            <div className="requirement-list">
              {requirements.map((item, index) => (
                <div key={index} className={item.regex.test(password) ? 'valid' : ''}>
                   
                </div>

              ))}
      

                
                  <p>
                  <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                  <RiLockPasswordFill style={{marginRight:'5px'}}/> Password must contain
                    
                  </div>
                  <br/>
                    <ul style={{display:'flex',flexDirection:'column',justifyContent:'center',alignContent:'center'}}>
                      <li>
                        At least one uppercase letter
                      </li>
                      <li>
                        At least one lowercase letter
                      </li>
                      <li>
                        Minimum 8 characters
                      </li>
                      <li>
                        At least one digit
                      </li>
                      <li>
                        At least one special character
                      </li>
                    </ul>
                  </p>




            </div>
            <br/>
            <div style={{ display: 'flex',flexDirection:'column', justifyContent: 'center', alignItems: 'center' ,color:'#e27396'}}>
            
                Already Registered? <Link style={{ color: '#e27396', textDecoration: 'none', fontWeight: 'bold' ,color:''}} to="/Login">
                <p style={{color:'#e27396'}}>Login</p>
                </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  </>
);
              }

export default Register