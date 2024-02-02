import React from 'react'
import "../style/authentication.scss"
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"


const Login = () => {

  const [err, setErr] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value
    const password = e.target[1].value
  

    try {

     
   await signInWithEmailAndPassword(auth, email, password)
   navigate("/")

      

    }
    catch (error) {
      setErr(true)
    }

  };


  return (
    <div className="Container">

<div className="main">
    <h1>Just Chat</h1>
    <p>Login</p>
    <form className="inputs" onSubmit={handleSubmit}>
    
        <input required type="Email" placeholder='Enter Email' />
        <input required type="password" placeholder='Enter Password' />
            <button>Login</button>
    </form>
    {err && (<span>Invalid Credential</span>)}
    <div className="alreadyhas">

    <p>Don't Have Account? <span><Link to={"/signup"}>Signup</Link></span></p>
    </div>
</div>

    </div>
  )
}

export default Login