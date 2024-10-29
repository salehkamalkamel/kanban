import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

// Helper function to wait for user state asynchronously
function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        unsubscribe(); // Stop listening once we get the user
        resolve(user);
      },
      (error) => reject(error)
    );
  });
}

export async function apiGetUserData() {
  try {
    // Wait for the Firebase auth state to initialize
    const user = await getCurrentUser();

    // Check if user is authenticated
    if (!user) {
      throw new Error("User is not authenticated.");
    }

    // Get the user document from Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));

    // Check if the document exists
    if (!userDoc.exists()) {
      throw new Error("User data does not exist.");
    }

    // Return user data
    return {
      success: true,
      data: userDoc.data(),
    };
  } catch (err) {
    console.error("Error fetching user data:", err.message);
    throw new Error(err.message);
  }
}
