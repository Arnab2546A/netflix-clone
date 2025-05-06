import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut} from "firebase/auth";
import {addDoc,
     collection,
      getFirestore} from "firebase/firestore";
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: "AIzaSyCmXubtpfL0u4Aulj7LXZnAFrBLW-fI2D0",
  authDomain: "netflix-clone-ea68b.firebaseapp.com",
  projectId: "netflix-clone-ea68b",
  storageBucket: "netflix-clone-ea68b.firebasestorage.app",
  messagingSenderId: "573058090641",
  appId: "1:573058090641:web:1e494979c0ddba70fa2130"
};
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore(app);
const signup=async(name,email,password)=>{
    try{
        const res=await createUserWithEmailAndPassword(auth,email,password);
        const user=res.user;
        await addDoc(collection(db,"users"),{
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in successfully");
  } catch (error) {
    console.error("Login error:", error); // Log the error silently
    // Optionally, you can handle the error without showing an alert
    // For example, return the error to the calling function
    toast.error(error.code.split('/')[1].split('-').join(' '));
    return error.code; // Return the error code for further handling
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error signing out:", error);
    alert("Failed to sign out. Please try again.");
  }
};
export {auth, db, signup, login, logout};