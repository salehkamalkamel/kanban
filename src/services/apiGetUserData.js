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

export async function apiGetUserData(dataType = "all", payload = {}) {
  try {
    const user = await getCurrentUser();
    if (!user) throw new Error("User is not authenticated.");

    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (!userDoc.exists()) throw new Error("User data does not exist.");

    const data = userDoc.data();
    let finalData;

    switch (dataType) {
      case "all":
        finalData = data;
        break;
      case "boards":
        finalData = data.boards || [];
        break;
      case "columns":
        finalData =
          data.boards?.find((board) => board.id === payload.id)?.columns || [];
        break;
      default:
        throw new Error(`Invalid data type: ${dataType}`);
    }

    return { success: true, data: finalData };
  } catch (err) {
    console.error("Error fetching user data:", err);
    throw new Error(err.message);
  }
}
