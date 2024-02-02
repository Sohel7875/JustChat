import React, { useContext, useEffect, useRef } from 'react'
import "../style/Message.scss"
import { AuthContext } from '../contex/AuthContext'
import { ChatContext } from '../contex/ChatContext'

const Message = ({message}) => {
  const currentUser = useContext(AuthContext)
  const {data} = useContext(ChatContext)

  const ref = useRef()

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  

  return ( 
   
   <div ref={ref}
   className={`message ${message.senderId === currentUser.uid && "owner"}`}>
<div className="messageInfo">
  <img src={message.senderId === currentUser.uid ? currentUser.photoURL: data.user.photoURL } alt="" id='user'/>
  <span>{new Date(message.date.seconds *1000).toLocaleString()}</span>
</div>
<div className="messageContain">

{message.text && <p>{message.text}</p>}
<img src={message.image} alt="" />

</div>

   </div>
  )
}

export default Message