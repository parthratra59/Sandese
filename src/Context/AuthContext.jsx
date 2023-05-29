import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../Firebase'
import React, { createContext, useEffect, useState } from 'react'
const Authorization=createContext()
const AuthContext = ({children}) => {
    
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
            <Authorization.Provider value={{currentUser}}>
                {children}
            </Authorization.Provider>        
        </>
    )

    
  
}

export default AuthContext
export {Authorization}