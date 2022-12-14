import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {collection, getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyAD1TuJhrNoL2MU-dCE_yt53TbCJeDftF8",
  authDomain: "jbonks-9496e.firebaseapp.com",
  projectId: "jbonks-9496e",
  storageBucket: "jbonks-9496e.appspot.com",
  messagingSenderId: "466082201634",
  appId: "1:466082201634:web:197fd190e6116dec5f8a7b"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage =  getStorage(app);

const userCol = collection(db, "users")

export {auth, db, userCol, storage}