import { createContext, useContext, useState, useEffect } from "react";
import { useGetUserData } from "../hooks/useGetUserData";

const ActiveBoard = createContext();
const useActiveBoardContext = () => useContext(ActiveBoard);

export default function ActiveBoardContext({ children }) {
  const { userData, gettingUserData } = useGetUserData();
  const [activeBoard, setActiveBoard] = useState(null);
  const [noBoards, setNoBoards] = useState(false);

  // Keep the active board in sync with user data
  useEffect(() => {
    if (!gettingUserData && userData?.boards) {
      if (userData.boards.length === 0) {
        setNoBoards(true);
        setActiveBoard(null); // No boards available
      } else {
        // If the current active board is not in the updated boards, set the first board as active
        const boardExists = userData.boards.some(
          (board) => board.id === activeBoard?.id
        );

        if (!boardExists) {
          setActiveBoard(userData.boards[0]); // Update to first board
        }

        setNoBoards(false);
      }
    }
  }, [gettingUserData, userData]);

  // Function to handle board changes
  function handleActiveBoard(board) {
    setActiveBoard(board);
  }

  return (
    <ActiveBoard.Provider value={{ noBoards, activeBoard, handleActiveBoard }}>
      {children}
    </ActiveBoard.Provider>
  );
}

export { useActiveBoardContext };
