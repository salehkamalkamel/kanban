import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

async function apiDeleteTask(boardId, columnId, taskId) {
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

    // Find the board by ID
    const boardIndex = boards.findIndex((board) => board.id === boardId);
    if (boardIndex === -1) {
      throw new Error("Board not found.");
    }

    const columns = boards[boardIndex].columns || [];

    // Find the column by ID
    const columnIndex = columns.findIndex((column) => column.id === columnId);
    if (columnIndex === -1) {
      throw new Error("Column not found.");
    }

    // Filter out the task to be deleted
    columns[columnIndex].tasks = columns[columnIndex].tasks.filter(
      (task) => task.id !== taskId
    );

    // Update the user's document with the modified boards array
    await updateDoc(userDocRef, { boards });

    console.log("Task deleted successfully!");
    return { success: true, message: "Task deleted successfully." };
  } catch (err) {
    console.error("Error deleting task:", err.message);
    return { success: false, message: err.message };
  }
}

export { apiDeleteTask };
