import React, { useState } from 'react';
import { auth } from '../Firebase';
import '../style.scss';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import eyesclose from '../image/eye-close.png';
import eyesopen from '../image/eye-open.png';
import toast from 'react-hot-toast';

const Login = () => {
  const [err, setErr] = useState(false);
  const [passwordvisible, setPasswordVisible] = useState(false);
  const [eyeIconSrc, setEyeIconSrc] = useState(eyesclose);
  const[loading,setloading]=useState(false);
  
  const handlePassword = () => {
    setPasswordVisible(!passwordvisible);
    setEyeIconSrc(passwordvisible ? eyesclose : eyesopen);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    
    try {
      // Sign in using Firebase
      await signInWithEmailAndPassword(auth,email, password);
      setloading(false);
      toast.success('Login Successful');
      navigate('/');
    } 
    catch (error) {

      setErr(true);
      setloading(true);
      toast.error('Invalid Credentials');
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    // Perform any necessary logic based on password validity
  };

  const topasswordchange = () => {
    navigate('/PasswordReset');
  };

  return (
    <>
      <div className='form-container'>
        <div className='formWrapper'>
          <span className='logo'>Sandese App</span>
          <span className='title' style={{color:'#AEBAC1',fontWeight:'bold'}}>Login</span>
          <form className='forming' onSubmit={handleSubmit}>
            <input type='email' placeholder='Email' required />
            <div className='eyebutton' style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type={passwordvisible ? 'text' : 'password'}
                placeholder='Password'
                id='password'
                
                required
                onChange={handlePasswordChange}
              />
              <img src={eyeIconSrc} alt='parthimage' id='eyeicon' onClick={handlePassword} />
            </div>
            <button >LOGIN</button>

            <p>
              You don't have an account? <Link style={{ color: '#e27396', textDecoration: 'none', fontWeight: 'bold' }} to="/register">Register</Link>
            </p>
            <p style={{ cursor: 'pointer', color: '#AEBAC1', marginTop: '-2px' }} onClick={topasswordchange}>
              Forgot Password
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
