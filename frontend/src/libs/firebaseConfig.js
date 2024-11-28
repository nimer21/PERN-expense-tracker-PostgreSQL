import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBvnPvHzzjECPGXK4zzCr_2aBJ9yQ8_g7E",
    authDomain: "expense-tracker-7280f.firebaseapp.com",
    projectId: "expense-tracker-7280f",
    storageBucket: "expense-tracker-7280f.firebasestorage.app",
    messagingSenderId: "153714195762",
    appId: "1:153714195762:web:e92815b0992f3fe2702b2b",
    measurementId: "G-PL9EFJ3C1B"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const analytics = getAnalytics(app);

export { app, auth };