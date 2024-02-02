import React, { useContext } from 'react'

import {BrowserRouter as Router,Routes,Route, Navigate} from "react-router-dom"
import Login from './Pages/Login'
import Signup from './Pages/Signup'


import "./style/authentication.scss"
import "./style/color.scss"
import "./style/App.scss"
import Home from './Pages/Home'
import { AuthContext } from './contex/AuthContext'
import Chat from './Componants/Chat'
import Sidebar from './Componants/Sidebar'


const MyApp = () => {

  const currentUser =useContext(AuthContext)


  const ProtectdRoute =({children}) =>{
    if(!currentUser){
      return <Navigate to="/login" /> 
    }

    return children
  }

  return (
    <Router>
      <Routes>
        <Route path='/'>
<Route index element= { <ProtectdRoute><Home />  </ProtectdRoute>} />
<Route path='login' element={<Login />} />
<Route path='signup' element={<Signup />} />
<Route path='chat' element ={<Chat />} />
<Route path='users' element ={<ProtectdRoute><Sidebar />  </ProtectdRoute>} />

        </Route>
      </Routes>
    </Router>
  )
}

export default MyApp