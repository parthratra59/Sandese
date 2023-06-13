import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db, storage } from '../Firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { RiLockPasswordFill } from 'react-icons/ri';
import Add from '../image/ava.png';
import eyesclose from '../image/eye-close.png';
import eyesopen from '../image/eye-open.png';

const Register = () => {
  const [err, setErr] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [eyeIconSrc, setEyeIconSrc] = useState(eyesclose);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [avatarSelected, setAvatarSelected] = useState(false);
  const [avatarUploaded, setAvatarUploaded] = useState(false); 
  const [savedPassword, setSavedPassword] = useState(''); // New state variable for saving the password
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const navigate = useNavigate();

  const handlePassword = () => {
    setPasswordVisible(!passwordVisible);
    setEyeIconSrc(passwordVisible ? eyesclose : eyesopen);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, 'users', res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, 'userChats', res.user.uid), {});

            navigate('/login');
          } catch (error) {
            console.log(error.message);
            setErr(true);
            setLoading(false);
          }
        });
      });

      setAvatarSelected(true);
      setAvatarUploaded(true);
      setErr(false);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
      setErr(true);
      setLoading(true);
    }
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);
    if(!email.match(emailRegex) && email.length > 0)
    {
      setEmailError(true);
    }
    else{
      setEmailError(false);
    }

  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    
    if(!password.match(passwordRegex) && password.length > 0)
    {
      setPasswordError(true);
    }
    else{
      setPasswordError(false);
    }
    setPassword(password);
    setSavedPassword(password); 
  };

  return (
    <>
      <div className='form-container'>
        <div className='formWrapper'>
          <span className='logo'>Sandese App</span>
          <span className='title' style={{color:'#AEBAC1',fontWeight:'bold'}}>Register</span>
          <form className='forming' onSubmit={handleSubmit}>
            <input type='text' placeholder='display name' required />
            <input type='email' placeholder='email' required value={email} onChange={handleEmailChange} className={emailError ? 'invalid' : ''} />
            {emailError && email.length > 0 && <span className='error'  style={{color:'#AEBAC1'}}>Format is invalid</span>}
            <div className='eyebutton' style={{ display: 'flex', alignItems: 'center' }}>
              <input type={passwordVisible ? 'text' : 'password'}  placeholder='password' id='password' value={password} required onChange={handlePasswordChange}/>
              
             
              <img src={eyeIconSrc} id='eyeicon' onClick={handlePassword} alt='Eye Icon' />
              
            </div>
            {passwordError && password.length > 0 && <span className='error'  style={{color:'#AEBAC1'}}>Format is invalid</span>}
            <input style={{ display: 'none', border: 'none' }} type='file' id='file' />
            <label htmlFor='file'>
              <img src={Add} alt='' required />
              <span style={{color:'#AEBAC1'}}>Add an avatar</span>
              
            </label>
            {avatarUploaded && <span className='success'  style={{color:'#AEBAC1'}}>Avatar uploaded successfully!</span>} {/* Success message for avatar upload */}
            {err && <span className='error'>Something went wrong</span>}
            {/* disable rhega jb tk error hai  dynamic button bn gya*/}
            <button disabled={emailError || passwordError || loading}>{loading ? 'Loading...' : 'Sign Up'}</button>
          </form>
          {/* err nhi hai tb yh dikhae iska koi meaning nhi hai bs  */}
            <>
              <div>
                <p>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <RiLockPasswordFill style={{ marginRight: '5px' }} /> Password must contain
                  </div>
                  <br />
                  <ul style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center' }}>
                    <li>At least one uppercase letter</li>
                    <li>At least one lowercase letter</li>
                    <li>Minimum 8 characters</li>
                    <li>At least one digit</li>
                    <li>At least one special character</li>
                  </ul>
                </p>
              </div>
              <br />
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#e27396' }}>
                Already Registered?
                <Link style={{ color: '#e27396', textDecoration: 'none', fontWeight: 'bold' }} to='/Login'>
                  Login
                </Link>
              </div>
            </>
        </div>
      </div>
    </>
  );
};

export default Register;
