import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile,fetchSignInMethodsForEmail,getAuth } from 'firebase/auth';
import { auth, db, storage} from '../Firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { RiLockPasswordFill } from 'react-icons/ri';
import Add from '../image/ava.png';
import eyesclose from '../image/eye-close.png';
import eyesopen from '../image/eye-open.png';
import { toast } from 'react-hot-toast';




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

      if (file) {
        // Avatar file is selected
        const date = new Date().getTime();
        const storageRef = ref(storage, `${displayName + date}`);

        await uploadBytesResumable(storageRef, file).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              await updateProfile(res.user, {
                displayName,
                photoURL: downloadURL,
              });

              toast.success('Avatar uploaded successfully');
                // jaise mongodb and nodejs mai krte na vohi idhr kr he hai create kro user ko aur uske andr uski id aur uski email aur uski photo url then set krdo firebase mai aur userchats mai bhi set krdo
              await setDoc(doc(db, 'users', res.user.uid), {
                uid: res.user.uid,
                displayName,
                email,
                photoURL: downloadURL,
              });

              await setDoc(doc(db, 'userChats', res.user.uid), {});

              setLoading(false);
              setAvatarUploaded(true);
              toast.success('Registration Successful');
              navigate('/login');
            } catch (error) {
              toast.error('Error uploading photo. Please try again later.'); 
              setErr(true);
              setLoading(false);
            }
          });
        });
        
        setAvatarSelected(true);
      } else {
        // Avatar file is not selected
        // Handle the registration logic without avatar
        // yh bhi kr skte dispayName.slice(0,1).toUpperCase() 0 hai start index 1 hai end index 1 excluded hai
        const firstCharacter = displayName.charAt(0).toUpperCase();
        const photoURL = `https://api.dicebear.com/6.x/initials/svg?seed=${firstCharacter}&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600`;

        await updateProfile(res.user, {
          displayName,
          photoURL,
        });

        await setDoc(doc(db, 'users', res.user.uid), {
          uid: res.user.uid,
          displayName,
          email,
          photoURL,
        });

        await setDoc(doc(db, 'userChats', res.user.uid), {});
        toast.success('Registration Successful');
        navigate('/login');
      }

      setErr(false);
      setLoading(true);
    } catch (err) {
      console.log(err.message);
      if (err.code === 'auth/email-already-in-use') {
        toast.error('Email already registered');
      } 
      setErr(true);
      setLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);
    if (!email.match(emailRegex) && email.length > 0) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;

    if (!password.match(passwordRegex) && password.length > 0) {
      setPasswordError(true);
    } else {
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
          <span className='title' style={{ color: '#AEBAC1', fontWeight: 'bold' }}>Register</span>
          <form className='forming' onSubmit={handleSubmit}>
            <input type='text' placeholder='display name' required />
            <input type='email' placeholder='email' required value={email} onChange={handleEmailChange} className={emailError ? 'invalid' : ''} />
          
            <div className='eyebutton' style={{ display: 'flex', alignItems: 'center' }}>
              <input type={passwordVisible ? 'text' : 'password'} placeholder='password' id='password' value={password} required onChange={handlePasswordChange} />
              <img src={eyeIconSrc} id='eyeicon' onClick={handlePassword} alt='Eye Icon' />
            </div>
            
            <input style={{ display: 'none', border: 'none' }} type='file' id='file' />
            <label htmlFor='file'>
              <img src={Add} alt='' />
              <span style={{ color: '#AEBAC1' }}>
                Add an avatar
                
              </span>
            </label>

            {/* Success message for avatar upload */}
            
            
            <button disabled={emailError || passwordError || loading}>{loading ? 'Loading...' : 'Sign Up'}</button>
          </form>
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