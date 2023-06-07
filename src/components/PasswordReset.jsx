import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase';
import '../style.scss';
import firebase from 'firebase/app';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Link } from 'react-router-dom';

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
      // Clear the input field
      setEmail('');
    } catch (error) {
      setMessage('!! Email is not registered !!');
      setErr(true);
      console.error(error);
    }
    setEmail('');
  };

  return (
    <>
      <div className='form-container'>
        <div className='formWrapper'>
          <span className='title'>RESET PASSWORD</span>
          <form className='forming' onSubmit={handleResetPassword}>
            <input
              type='email'
              placeholder='xyz@gmail.com...'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button>Change</button>
            {!err && (
              <div style={{ display: 'flex', justifyContent: 'center',alignItems: 'center'}}>
                <p className='mapping'>{message}</p>
              </div>
            )}
            {err && (
              <div style={{ display: 'flex',flexDirection:'column', alignItems: 'center' }}>
                <p className='mapping'>{message}</p>
                <p style={{ marginTop: '8px' }}>
                  <span>Click on the </span>
                  <Link
                    style={{ color: '#e27396', textDecoration: 'none', fontWeight: 'bolder' }}
                    to='/register'
                  >
                    Register
                  </Link>
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default PasswordReset;
