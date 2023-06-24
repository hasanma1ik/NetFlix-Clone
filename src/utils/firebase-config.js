// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyD9BKF0xU-buyno3W6e6Zt167CG0KShzEA",
  authDomain: "netflix-project-f4f8c.firebaseapp.com",
  projectId: "netflix-project-f4f8c",
  storageBucket: "netflix-project-f4f8c.appspot.com",
  messagingSenderId: "443932710605",
  appId: "1:443932710605:web:6023b73728a66a77dffb84",
  measurementId: "G-5B629S1GW3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app)