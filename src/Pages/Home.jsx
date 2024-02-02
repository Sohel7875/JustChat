import React from 'react'
import Sidebar from "../Componants/Sidebar"
import Dchat from '../Componants/Dchat'

import "../style/Chat.scss"


import "../style/Home.scss"

const Home = () => {

  return (
<div className="Home" id='Home'>
  <div className="container">
 
    <Sidebar className="sidebar" />
    <Dchat  className="Chat"/>
  
  </div>


</div>
  )
}

export default Home