import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

// Column shape example:
// { id: "column-1", title: "New Column", tasks: [] }

async function apiAddColumn(boardId, newColumn) {
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
    const boardIndex = boards.findIndex((board) => board.id === boardId);
    if (boardIndex === -1) {
      throw new Error("Board not found.");
    }

    // Add the new column to the board's columns array
    boards[boardIndex].columns = [
      ...(boards[boardIndex].columns || []),
      newColumn,
    ];

    // Update the user's document with the modified boards array
    await updateDoc(userDocRef, { boards });

    console.log("Column added successfully!");
    return { success: true, message: "Column added successfully." };
  } catch (err) {
    console.error("Error adding column:", err.message);
    return { success: false, message: err.message };
  }
}

export { apiAddColumn };
