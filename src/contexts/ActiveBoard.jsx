// import { createContext, useContext, useState, useEffect } from "react";
// import { useDataContext } from "./DataProvider";

import { useContext, useState } from "react";
import { createContext } from "react";

// const ActiveBoardContext = createContext();

// export function useActiveBoardContext() {
//   return useContext(ActiveBoardContext);
// }

// export default function ActiveBoardProvider({ children }) {
//   // Initialize state with value from localStorage if available, or null otherwise
//   const [activeBoardId, setActiveBoardId] = useState(() => {
//     const savedBoardId = localStorage.getItem("activeBoardId");
//     return savedBoardId ? JSON.parse(savedBoardId) : null;
//   });

//   const { getBoardById, isLoading } = useDataContext();

//   const [activeBoard, setActiveBoard] = useState(null);

//   useEffect(() => {
//     const board = getBoardById(activeBoardId);
//     setActiveBoard(board);
//   }, [getBoardById, activeBoardId]);

//   const [noBoards, setNoBoards] = useState(false);

//   // Function to handle setting the active board
//   const handleActiveBoard = (boardId) => {
//     setActiveBoardId(boardId);
//     // Save the current active board to localStorage
//     localStorage.setItem("activeBoard", JSON.stringify(boardId));
//   };

//   // Function to reset the active board state and other related states
//   const resetActiveBoardState = () => {
//     setActiveBoardId(null);
//     setNoBoards(false);
//     // Remove the active board from localStorage
//     localStorage.removeItem("activeBoardId");
//   };

//   // Function to set the state when no boards are available
//   const handleNoBoards = (status) => {
//     setNoBoards(status);
//   };

//   // Effect to keep localStorage in sync with `activeBoard` when it changes
//   useEffect(() => {
//     if (activeBoardId) {
//       localStorage.setItem("activeBoardId", JSON.stringify(activeBoardId));
//     } else {
//       localStorage.removeItem("activeBoardId");
//     }
//   }, [activeBoardId]);

//   return (
//     <ActiveBoardContext.Provider
//       value={{
//         activeBoardId,
//         noBoards,
//         handleActiveBoard,
//         resetActiveBoardState,
//         handleNoBoards,
//         activeBoard,
//         isLoading,
//       }}
//     >
//       {children}
//     </ActiveBoardContext.Provider>
//   );
// }

const ActiveBoardContext = createContext();

export function useActiveBoardContext() {
  return useContext(ActiveBoardContext);
}
export default function ActiveBoardProvider({ children }) {
  const [activeBoardId, setActiveBoardId] = useState(
    localStorage.getItem("active-board-id") || ""
  );

  function handleActiveBoardId(boardId) {
    setActiveBoardId(boardId);
    localStorage.setItem("active-board-id", boardId);
  }
  return (
    <ActiveBoardContext.Provider value={{ activeBoardId, handleActiveBoardId }}>
      {children}
    </ActiveBoardContext.Provider>
  );
}
