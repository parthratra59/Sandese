import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../Firebase';
import { confirmPasswordReset } from 'firebase/auth';
import eyesclose from '../image/eye-close.png';
import eyesopen from '../image/eye-open.png';
import toast from 'react-hot-toast';
import "./ResetPassword.css"
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

  const query = useQuery();

  const resetPassword = async (oobCode, newPassword) => {
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

    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

    if (!passwordRegex.test(newpassword)) {
      toast.error(
        <div className="error-message">
          <p>
            Password must be at least 8 characters long and must contain at
            least:
          </p>
          <ul>
            <li>at least one uppercase letter</li>
            <li>at least one lowercase letter</li>
            <li>at least one number</li>
            <li>Special characters are allowed</li>
          </ul>
        </div>
      );
      return;
    }

    try {
      if (newpassword === savevalue) {
        setErr(true);
        return;
      }

      setLoading(true);
      const res = await resetPassword(query.get('oobCode'), newpassword);

      if (res) {
        // Password reset successful
        // You can show a success message or redirect the user to a confirmation page
        setLoading(false);
        navigate('/login');
        toast.success('Password reset successful');
      } else {
        // Password reset failed
        // You can show an error message to the user
        setLoading(false);
        setErr(true);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      setErr(true);
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;

    if (password.length > 0) {
      setPasswordError(false); // Reset password error when there's input
    }
    setNewPassword(password);
  };

  const handlepassword = () => {
    setPasswordVisible(!passwordvisible);
    setEyeIconSrc(passwordvisible ? eyesclose : eyesopen);
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
              <img src={eyeIconSrc} alt='imaging' id='eyeicon' onClick={handlepassword} />
            </div>

            {err && (
              <span className='error' style={{ color: '#AEBAC1' }}>
                New password must be different from the previous password.
              </span>
            )}
            {/* dynamic button */}
            <button disabled={passwordError || loading}>
              {loading ? 'Loading...' : 'RESET'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPage;