import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyBzRAW1Q92f09y0cPRqRvHFF3tds9I2jXE",
  authDomain: "just-chat-51a1e.firebaseapp.com",
  projectId: "just-chat-51a1e",
  storageBucket: "just-chat-51a1e.appspot.com",
  messagingSenderId: "551421774381",
  appId: "1:551421774381:web:34018e01a835847c0546a4",
  measurementId: "G-PDWH7K2109"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore()