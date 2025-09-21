import { initializeApp } from "firebase/app"; 
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from "firebase/storage"; 

// Firebase config 
const firebaseConfig = {
  apiKey: "AIzaSyBG2t_tMu7XI9w3yAFmj1byoKhk_QU9Q4Q",
  authDomain: "to-you-5-years.firebaseapp.com",
  projectId: "to-you-5-years",
  storageBucket: "to-you-5-years.firebasestorage.app",
  messagingSenderId: "503424530100",
  appId: "1:503424530100:web:f39051c0c8f8a0fc6609e1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);  

// Export for frontend use 
export const auth = getAuth(app); 
export const db = getFirestore(app); 
export const storage = getStorage(app); 

export default app; 