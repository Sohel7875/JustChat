import React, { useContext, useState } from 'react'
import "../style/Search.scss"
import { collection, query, where,getDocs, setDoc, doc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";
import {db} from "../firebase"

import searchImg from "../img/search.png"
import { AuthContext } from '../contex/AuthContext';

const Search = () => {
  const [userName, setUserName] = useState("")
  const [user, setUser] = useState(null)
  const [err, setErr] = useState(false)



  const currentUser =useContext(AuthContext)

const handleSearch = async() =>{
  
const q = query(collection(db, "users"), where("displayName", "==",userName));



try {
  const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  
 setUser(doc.data())
});
} catch (error) {
  setErr(true)
  
}

}

  const handleKey =(e) =>{
e.code=== "Enter" && handleSearch();
  }
  const handleSelect =async () =>{
   
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid: user.uid + currentUser.uid
    try {
      
      const res = await getDoc(doc(db,"chats",combinedId))
    
      if(!res.exists()){
   
        await setDoc(doc(db,"chats",combinedId), {messages:[]})

        await updateDoc(doc(db,"userChats", currentUser.uid),{
          [combinedId+".userInfo"]:{
           
            uid:user.uid,
            displayName:user.displayName,
            photoURL:user.photoURL
          },
          [combinedId +".date"]:serverTimestamp()
        })

        await updateDoc(doc(db,"userChats", user.uid),{
          [combinedId+".userInfo"]:{
            uid:currentUser.uid,
            displayName:currentUser.displayName,
            photoURL:currentUser.photoURL
          },
          [combinedId +".date"]:serverTimestamp()
        })
      }
    } catch (error) {
      setErr(true)
    }
setUser(null)
setUserName("")
  }


  return (
    <div className="Search">
      <div className="searchForm">
        <input type="text" placeholder='Search User' onKeyDown={handleKey}  onChange={e =>{setUserName(e.target.value)}} value={userName}/>
        <img src={searchImg} alt="" onClick={ handleSearch} />
      </div>

     { user && <div className="userchat" onClick={handleSelect}>
        <img src={user.photoURL} alt="" />
        <div className="userChatInfo">
          <span>{user.displayName}</span> 
          
      {err && <span>User Not Found</span>}
        </div>
      </div>}
    </div>
  )
}

export default Search