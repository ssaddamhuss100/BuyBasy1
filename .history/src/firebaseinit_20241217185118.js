// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDveCnNfJ3KZEH-ytIsSnVRx0qiVRx2fkY",
  authDomain: "buybusy1-bbadf.firebaseapp.com",
  projectId: "buybusy1-bbadf",
  storageBucket: "buybusy1-bbadf.firebasestorage.app",
  messagingSenderId: "1070075014456",
  appId: "1:1070075014456:web:3dc970719df502ef6be5cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//export firestore database
//it will be imported into your react app whenever it is needed
export const db = getFirestore(app);