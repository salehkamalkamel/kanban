import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

async function apiDeleteBoard(boardId) {
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

    const boards = userDoc.data().boards || [];

    // Filter out the board with the specified ID
    const updatedBoards = boards.filter((board) => board.id !== boardId);
    // Update Firestore with the new boards array
    await updateDoc(userDocRef, {
      boards: updatedBoards,
    });

    console.log("Board deleted successfully!");
    return { success: true, message: "Board deleted successfully." };
  } catch (err) {
    console.error("Error Deleting Board:", err.message);
    return {
      success: false,
      message: err.message,
    };
  }
}

export { apiDeleteBoard };
