import React, { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import "../style/authentication.scss"
import avatar from "../img/avatar.png"
import { auth, db, storage } from "../firebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {

  const [err, setErr] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value
    const file = e.target[3].files[0]

    try {

      const res = await createUserWithEmailAndPassword(auth, email, password)

      const storageRef =  ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on("state_changed",(snapshot) =>{},

        (error) => {
          setErr(true)
        },
        () => {
       
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,

            });

            await setDoc(doc(db,"userChats",res.user.uid),{});
            navigate("/login")
      
          });
        }
      );
      

    }
    catch (error) {
      setErr(true)
    }

  };


  return (
    <div className="Container">

      <div className="main">
        <h1>Just Chat</h1>
        <p>Ragister</p>
        <form className="inputs" onSubmit={handleSubmit}>
          <input type="text" placeholder='Username' />
          <input type="Email" placeholder='Email' />
          <input type="password" placeholder='Enter Password' />
          <div className="filehandle">
            <label htmlFor="Ufile">
              <img src={avatar} alt="" />
              <span>Upload Avatar</span>
              <input type="file" id='Ufile' />
            </label>
          </div>
          <button>Sign UP</button>
          {err && <span>Something Went Wrong!! Try Again</span>}
        </form>
        <div className="alreadyhas">

          <p>already Have Account? <span><Link to={"/login"}>Login</Link></span></p>
        </div>
      </div>

    </div>
  )
}

export default Signup