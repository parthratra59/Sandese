import { onAuthStateChanged } from 'firebase/auth'
// import { auth } from '../Firebase'
import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { AuthContext } from './AuthContext'

// right side ke chats ko kaise handle 
// use state bhi krskte but but yh thoda complex hai 
// that's why useresucer hook use krege
// usereducer    hook copy mai explain hai
const ChatContext=createContext()
// const {currentUser}=useContext(Authorization);
export const Chatcontextprovider = ({children}) => {
    const {currentUser} = useContext(AuthContext);
    const INITIAL_STATE ={
        chatId:'null',
        user : {}
    }
    const chatReducer =(state,action)=>{
        switch(action.type){
            case "CHANGE_USER":
                return{
                    user:action.payload,
                    chatId:
                    currentUser.uid > action.payload.uid
                    ? currentUser.uid + action.payload.uid
                    : action.payload.uid + currentUser.uid,
                }
                default:
                    return state;
        }
    }
    const [state,dispatch]= useReducer(chatReducer,INITIAL_STATE);
    return(
        <>
        {/* value prop hai idhr  dispatch functio  hai */}
            <ChatContext.Provider value={{data:state,dispatch}}>
                {children}
            </ChatContext.Provider>        
        </>
    )

    
  
}

export default Chatcontextprovider
export {ChatContext}