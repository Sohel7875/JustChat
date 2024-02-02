import React, { useContext, useEffect, useState } from 'react'
import {onSnapshot,doc } from "firebase/firestore";
import {db} from "../firebase"
import "../style/Chats.scss"
import { AuthContext } from '../contex/AuthContext';
import { ChatContext } from '../contex/ChatContext';
import {Link} from "react-router-dom"



const Chats = () => {
  const [chats,setChats] =useState([])
const currentUser = useContext(AuthContext)
const {dispatch} = useContext(ChatContext)

  useEffect(() =>{

const getChats =() =>{
  const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
    setChats(doc.data())
});

return () =>{
unsub();
}
}
currentUser.uid && getChats()

  },[currentUser.uid])



const handleSelect = (u) =>{
  dispatch({type:"CHANGE_USER", payload: u });
  

}


  return (

    <div className="chats">
     <Link to="/chat" style={{textDecoration:"none", color:"black"}}> 
      {[{chats}]?.length>0 && Object.entries(chats)?.sort((a,b) =>b[1].date -a[1].date).map(chat =>
     <div id='userChat' className="userchat" key={chat[0]} onClick={() =>handleSelect(chat[1].userInfo)}>
        <img src={chat[1].userInfo.photoURL} alt="" />
        <div className="userChatInfo">
          <span>{chat[1].userInfo.displayName}</span>
          <p>{chat[1].lastMessage?.text}</p>
        </div>
      </div>
    )}
     </Link>
   </div>
  )
}

export default Chats