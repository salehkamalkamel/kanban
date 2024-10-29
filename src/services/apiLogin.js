import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

async function apiLogin(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    return {
      success: true,
      message: "Login successful!",
      user: user,
    };
  } catch (error) {
    console.error("Error during login:", error.message);

    // Convert the Firebase error into a thrown exception
    let errorMessage;
    switch (error.code) {
      case "auth/user-not-found":
        errorMessage = "No user found with this email.";
        break;
      case "auth/wrong-password":
        errorMessage = "Incorrect password. Please try again.";
        break;
      case "auth/invalid-email":
        errorMessage = "Invalid email format. Please enter a valid email.";
        break;
      case "auth/invalid-credential":
        errorMessage = "Invalid email or password.";
        break;
      default:
        errorMessage = "Failed to log in. Please try again later.";
    }

    // Throw the error so react-query can catch it
    throw new Error(errorMessage);
  }
}

export { apiLogin };
