import { onAuthStateChanged,confirmPasswordReset } from 'firebase/auth'
import { auth } from '../Firebase'
import React, { createContext, useEffect, useState } from 'react'

const AuthContext=createContext()
const Authorization = ({children}) => {
    
    const [currentUser,setCurrentuser] = useState({})
    useEffect(()=>{
        const hello=onAuthStateChanged(auth,(user)=>{
            setCurrentuser(user);
            console.log(user)
        })
        // agr auth function paas krege firebase vale component se 
        // agr user hua toh current user mai update kredege

        return()=>{
            hello()
            // leakage na ho memory that's why
        }
    },[])


 

    return(
        <>
            <AuthContext.Provider value={{currentUser}}>
                {children}
            </AuthContext.Provider>        
        </>
    )

    
  
}

export default Authorization
export {AuthContext}