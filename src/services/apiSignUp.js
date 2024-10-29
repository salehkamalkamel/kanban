import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

async function apiSignUp(email, password) {
  try {
    // Create the user with email and password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Save user details in Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name: user.displayName || "Anonymous", // Handle missing displayName
      email: user.email,
      boards: [],
    });

    return {
      success: true,
      message: "User signed up successfully!",
      user: user,
    };
  } catch (error) {
    console.error("Error during sign up:", error.message);

    // Convert Firebase error to a thrown exception
    let errorMessage;
    switch (error.code) {
      case "auth/email-already-in-use":
        errorMessage = "Email already in use. Please try another email.";
        break;
      case "auth/invalid-email":
        errorMessage = "Invalid email format. Please enter a valid email.";
        break;
      case "auth/weak-password":
        errorMessage = "Password is too weak. Please use a stronger password.";
        break;
      default:
        errorMessage = "Failed to sign up. Please try again later.";
    }

    // Throw the error for external handling (e.g., react-query)
    throw new Error(errorMessage);
  }
}

export { apiSignUp };
