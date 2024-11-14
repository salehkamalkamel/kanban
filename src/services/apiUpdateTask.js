import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

async function apiUpdateTask(activeBoardId, columnId, taskId, updatedTask) {
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
    const activeBoard = boards.find((board) => board.id === activeBoardId);
    if (!activeBoard) {
      throw new Error("Board not found.");
    }

    const column = activeBoard.columns?.find((col) => col.id === columnId);
    if (!column) {
      throw new Error("Column not found.");
    }

    // Update the task within the column
    const updatedTasks = column.tasks.map((task) =>
      task.id === taskId ? { ...task, ...updatedTask } : task
    );

    // Update the column with the new tasks array
    const updatedColumns = activeBoard.columns.map((col) =>
      col.id === columnId ? { ...col, tasks: updatedTasks } : col
    );

    // Update the board with the new columns array
    const updatedBoards = boards.map((board) =>
      board.id === activeBoardId ? { ...board, columns: updatedColumns } : board
    );

    console.log(updatedBoards);
    // Save the updated boards back to Firestore
    await updateDoc(userDocRef, { boards: updatedBoards });

    // Re-fetch the document to confirm the update
    const updatedDoc = await getDoc(userDocRef);
    const updatedBoardsAfterUpdate = updatedDoc.data().boards || [];

    console.log("Task updated successfully!", updatedBoardsAfterUpdate);

    return {
      success: true,
      message: "Task updated successfully.",
      updatedBoards: updatedBoardsAfterUpdate,
    };
  } catch (err) {
    console.error("Error updating task:", err.message);
    throw new Error(err.message);
  }
}

export { apiUpdateTask };
