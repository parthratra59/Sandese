import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../Firebase';
import { confirmPasswordReset } from 'firebase/auth';
import eyesclose from '../image/eye-close.png';
import eyesopen from '../image/eye-open.png';

const useQuery = () => {
  const location = useLocation();
  return new URLSearchParams(location.search);
};

const ResetPage = ({ savevalue }) => {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [newpassword, setNewPassword] = useState('');
  const [passwordvisible, setPasswordVisible] = useState(false);
  const [eyeIconSrc, setEyeIconSrc] = useState(eyesclose);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const handlepassword = () => {
    setPasswordVisible(!passwordvisible);
    setEyeIconSrc(passwordvisible ? eyesclose : eyesopen);
  };

  const query = useQuery();

  const resetingpassword = async (oobCode, newPassword) => {
    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      return true;
    } catch (error) {
      console.error('Error confirming password reset:', error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newpassword == savevalue) {
        setErr(true);
        return;
      }
      const res = await resetingpassword(query.get('oobCode'), newpassword);
      console.log(res);

      // Password reset successful
      // You can show a success message or redirect the user to a confirmation page
      setErr(false);
      setLoading(false);
      navigate('/login');
    } catch (error) {
      console.log(error);
      setErr(true);
      setLoading(true);
      // Password reset failed
      // You can show an error message to the user
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;

    if (!password.match(passwordRegex) && password.length > 0) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
    setNewPassword(password);
  };

  return (
    <>
      <div className='form-container'>
        <div className='formWrapper'>
          <span className='title'>RESET PASSWORD</span>
          <form className='forming' onSubmit={handleSubmit}>
            <div className='eyebutton' style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type={passwordvisible ? 'text' : 'password'}
                placeholder='Password'
                id='password'
                value={newpassword}
                required
                onChange={handlePasswordChange}
              />
              <img src={eyeIconSrc} id='eyeicon' onClick={handlepassword} />
            </div>
            {passwordError && newpassword.length > 0 && (
              <span className='error' style={{ color: '#AEBAC1' }}>
                Format is invalid
              </span>
            )}
            {err && (
              <span className='error' style={{ color: '#AEBAC1' }}>
                New password must be different from the previous password.
              </span>
            )}
            {/* dynamic button */}
            <button disabled={passwordError || loading}>{loading ? 'Loading...' : 'RESET'}</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPage;
