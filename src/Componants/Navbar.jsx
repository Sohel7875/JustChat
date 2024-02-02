import React, { useContext, useEffect, useState } from 'react'
import img from "../img/logout.png"
import homeing from "../img/home.png"
import {GiHamburgerMenu} from "react-icons/gi"
import {RxCross1} from "react-icons/rx"


import "../style/Navbar.scss"
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { AuthContext } from '../contex/AuthContext'
import { Link } from 'react-router-dom'

const Navbar = () => {
const currentUSer =useContext(AuthContext)

const [isOpen,setIsopen] = useState(false)
const [screenWidth, setScreenWidth] = useState(window.innerWidth)

const handdleClick =() =>{
  setIsopen(!isOpen)
}

useEffect(() =>{
  const changeDevice =() =>{
    setScreenWidth(window.innerWidth)
  }

window.addEventListener("resize",changeDevice)
  if(screenWidth > 480){
    setIsopen(false)
  }
},[screenWidth])

  return (
   <div className="Navbar">
<span className="logo">Just Chat</span>
{/* <div className="ham"  onClick={()=>{setIsopen(!isOpen)}}>{isOpen ? <RxCross1 /> :<GiHamburgerMenu />}</div> */}
<div className="ham"  onClick={()=>{handdleClick()}}>{isOpen ? <RxCross1 /> :<GiHamburgerMenu />}</div>
{
  isOpen && (<div className="mobNav">
  <div className="msers">
  <img src={currentUSer.photoURL} alt="img" />
    <span>{currentUSer.displayName}</span>
   
  </div>
  
  <div className="navLink">
   
  <div className="log"  onClick={() =>{setIsopen(false)}}>
    <img src={homeing} alt="" />
    <span> <Link to={"/"} className='link' >Home</Link></span>
  </div>
  <div className="log">
    <img src={img} alt="" />
    <span onClick={()=>{signOut(auth) }} >Logout</span>
  </div>
    
  </div>
  </div>)
}
<div className="user">
  <img src={currentUSer.photoURL} alt="img" />
  <span>{currentUSer.displayName}</span>
  <button onClick={()=>{signOut(auth)}} >logout</button>
</div>

   </div>
  )
}

export default Navbar