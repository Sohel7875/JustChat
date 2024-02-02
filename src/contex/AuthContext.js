import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext()


export const AuthContextProvidor = ({children}) =>{
   let [currentUser, setCurrentUser] = useState({auth})

    useEffect(() =>{
const unsub= onAuthStateChanged(auth,(user) =>{
    setCurrentUser(user)
    
})
return () =>{
unsub()
}
 

    },[]);

    return(
    <AuthContext.Provider value={currentUser}>
        
      
        {children}
    </AuthContext.Provider>
    );
}