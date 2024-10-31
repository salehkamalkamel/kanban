import { signInWithPopup } from "firebase/auth";
import { auth, db, googleProvider } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

async function apiLoginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider); // Fix: Await the result
    const user = result.user;

    const userDoc = await getDoc(doc(db, "users", user.uid));

    if (!userDoc.exists()) {
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        boards: [],
      });
      console.log("created new user successfully!");
    } else {
      console.log("logedin existing user successfully!");
    }

    return {
      success: true,
      message: "Login successful!",
      user: user,
    };
  } catch (error) {
    console.error("Login Failed With Google:", error.message);
    throw new Error(error.message);
  }
}

export { apiLoginWithGoogle };
