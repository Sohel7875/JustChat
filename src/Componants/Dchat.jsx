import React, { useContext } from 'react'
import "../style/Dchat.scss"

import Messages from './Messages'
import Input from "./Input"
import {Link} from "react-router-dom"

import imgback from "../img/back.png"
import { ChatContext } from '../contex/ChatContext'

const Dchat = () => {
  const {data} = useContext(ChatContext)

  return (
   <div className="Chat" >
<div className="chatInfo">
  <div className="cred">

 
  <Link to={'/users'}> <img src={imgback} alt="" id='back'/></Link>
  {data.user.photoURL &&( <img src={data.user?.photoURL} alt="" />)}
  <span>{data.user?.displayName}</span>
  </div>
  <div className="ChatIcons">
    {/* <img src={img1} alt="" />
    <img src={img2} alt="" />
    <img src={img3} alt="" id="more" /> */}
  </div>
</div>
  <Messages />
  <Input />
   </div>
  )
}

export default Dchat