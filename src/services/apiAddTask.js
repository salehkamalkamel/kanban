import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

// Task shape example:
// { id: "task-1", title: "New Task", description: "Task description" }

async function apiAddTask(boardId, columnId, newTask) {
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

    // Add the new task to the column's tasks array
    columns[columnIndex].tasks = [
      ...(columns[columnIndex].tasks || []),
      newTask,
    ];

    // Update the user's document with the modified boards array
    await updateDoc(userDocRef, { boards });

    console.log("Task added successfully!");
    return { success: true, message: "Task added successfully." };
  } catch (err) {
    console.error("Error adding task:", err.message);
    return { success: false, message: err.message };
  }
}

export { apiAddTask };
