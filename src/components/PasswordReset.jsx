import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../Firebase';
import '../style.scss';
import { sendPasswordResetEmail } from 'firebase/auth';
import toast from 'react-hot-toast';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email, {
        url: 'http://localhost:3000/login'
      });
      setMessage('Password reset email sent');
      toast.success(`Password reset email sent successfully to  ${email}`);
      setEmail('');
    } catch (error) {
      // setMessage('Email is not registered');
      toast.error(`Email is not registered`);
      setErr(true);
      console.error(error);
    }
  };

  return (
    <>
      <div className='form-container'>
        <div className='formWrapper'>
          <span className='title' style={{ color: '#AEBAC1', fontWeight: 'bold' }}>FORGOT PASSWORD</span>
          <form className='forming' onSubmit={handleResetPassword}>
            <input
              type='email'
              placeholder='xyz@gmail.com...'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button>SEND</button>
            {/* {err && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <p className='mapping'>{message}</p>
              </div>
            )} */}
            <Link to='/login' style={{ color: '#AEBAC1', textDecoration: 'none' }}>Back</Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default PasswordReset;
