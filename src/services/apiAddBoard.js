import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { auth, db } from "../firebase";

// Board shape
// {
//   title,
//   id,
//   columns;
// }

async function apiAddBoard(board) {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("No authenticated user found.");
    }

    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      throw new Error("User data does not exist.");
    }

    await updateDoc(userDocRef, {
      boards: arrayUnion(board),
    });

    console.log("Board added successfully!");
    return { success: true, message: "Board added successfully." };
  } catch (err) {
    console.error("Error adding new board:", err.message);
    return { success: false, message: err.message };
  }
}

export { apiAddBoard };
