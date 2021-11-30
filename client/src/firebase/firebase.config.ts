// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getDatabase} from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8240hj-vE7U54hK6QovuKJp8nTa85ndA",
  authDomain: "linkage-7dbe1.firebaseapp.com",
  databaseURL: "https://linkage-7dbe1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "linkage-7dbe1",
  storageBucket: "linkage-7dbe1.appspot.com",
  messagingSenderId: "729201908555",
  appId: "1:729201908555:web:89ef7862289b323f0e26ce",
  measurementId: "G-FZBGJJK4YR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const rtdb = getDatabase(app)

export {app, analytics, rtdb}