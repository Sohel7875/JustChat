import React from 'react'

import "../style/Sidebar.scss"
import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats'

const Sidebar = () => {
  return (
   <div className="Sidebar" id='Sidebar'>
    <Navbar className ="Navbar" />
    <Search className ="Search"/>
    <Chats className ="Chats" />
   </div>
  )
}

export default Sidebar