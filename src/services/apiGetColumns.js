import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

// Function to get all columns from a specific board
async function apiGetColumns(boardId) {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("No authenticated user found.");
    }

    // Reference to the user's document
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      throw new Error("User data does not exist.");
    }

    const boards = userDoc.data().boards || [];

    // Find the board by its ID
    const board = boards.find((b) => b.id === boardId);
    if (!board) {
      throw new Error("Board not found.");
    }

    // Return the columns array from the board
    console.log("Columns fetched successfully!");
    return { success: true, columns: board.columns || [] };
  } catch (err) {
    console.error("Error fetching columns:", err.message);
    return { success: false, message: err.message };
  }
}

export { apiGetColumns };
