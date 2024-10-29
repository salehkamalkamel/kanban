import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

async function apiUpdateBoard(updatedBoard) {
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

    // Find and update the matching board by ID
    const updatedBoards = boards.map((board) =>
      board.id === updatedBoard.id ? { ...board, ...updatedBoard } : board
    );

    // Update Firestore with the new boards array
    await updateDoc(userDocRef, {
      boards: updatedBoards,
    });

    console.log("Board updated successfully!");
    return { success: true, message: "Board updated successfully." };
  } catch (err) {
    console.error("Error updating board:", err.message);
    return {
      success: false,
      message: err.message,
    };
  }
}

export { apiUpdateBoard };
