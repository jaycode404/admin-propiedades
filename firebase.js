import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBX3CmQwp2vexP4eTtBpYF7-2Fs8pi1hlU",
  authDomain: "admin-propiedades.firebaseapp.com",
  projectId: "admin-propiedades",
  storageBucket: "admin-propiedades.appspot.com",
  messagingSenderId: "960516410954",
  appId: "1:960516410954:web:a142c08a9660ee66c4e0b3",
  measurementId: "G-X4KY959QS0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage(app)
export { app, db, auth, storage };
