import React from 'react'
import { useState } from 'react';
import { auth } from '../Firebase';
import '../style.scss'
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import eyesclose from '../image/eye-close.png'
import eyesopen from '../image/eye-open.png'

// import Add from '. ./image/avatar.png'
const Login = () => {
    
    
    const [err, setErr] = useState(false);
    const [passwordvisible,setPasswordVisible]=useState(false)
    const [eyeIconSrc, setEyeIconSrc] = useState(eyesclose);
    // starting mai nhi hai visible
    const handlepassword =()=>{
      // setPasswordVisible(!passwordvisible);
      setPasswordVisible(!passwordvisible);
    setEyeIconSrc(passwordvisible ? eyesclose : eyesopen);
    }

    const navigate=useNavigate()
    const handleSubmit= async(e)=>{
        e.preventDefault();
        // console.log(e.target[0].value)
        const email=e.target[0].value;
        const password=e.target[1].value;
        

        try{
    //    ab sign in hoga na iska mtlb apka account bna hai
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/")
        
        }catch(error)  {
            setErr(true);
            }
};  




return(

    <>
        <div className='form-container'>
            <div className='formWrapper'>
                <span className='logo'>Sandese App</span>
                <span className='title'>Login</span>
            <form className='forming' onSubmit={handleSubmit}>
                {/* <input type='text' placeholder='display name'/> */}
                <input type='email' placeholder='email'/>
                <div className='eyebutton' style={{display:'flex',alignItems:'center'}} >
                <input type={passwordvisible ? 'text' : 'password'} placeholder='password' id='password'/>
                <img src={eyeIconSrc} id='eyeicon' onClick={handlepassword}/>
                </div>
                {/* <input type='text' placeholder=''/> */}
                {/* <input style={{display:'none',border:'none' }} type='file' id='file'/>
                <label htmlFor='file'>
                    <img src={Add} alt=''/>
                    <span>Add an avatar</span>
                </label> */}
                 
                <button >Sign in</button>
                {/* because account nhi hai  */}
                <p>You don't have an account? <Link style={{color:'#e27396' ,textDecoration: 'none' ,fontWeight:'bold'}} to="/register">Register</Link></p>
            </form>
            
        </div>
        </div>
    </>
  )
}

export default Login