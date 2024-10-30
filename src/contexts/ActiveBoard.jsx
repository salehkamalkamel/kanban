import { createContext, useContext, useState, useEffect } from "react";
import { useGetData } from "../hooks/useGetData";

const ActiveBoard = createContext();
const useActiveBoardContext = () => useContext(ActiveBoard);

export default function ActiveBoardContext({ children }) {
  const { data, isLoading } = useGetData("boards");
  const [activeBoard, setActiveBoard] = useState(null);
  const [noBoards, setNoBoards] = useState(false);

  // Keep the active board in sync with user data
  useEffect(() => {
    if (!isLoading && data?.data) {
      const boardExists = data?.data.some(
        (board) => board.id === activeBoard?.id
      );

      if (!boardExists) {
        setActiveBoard(data?.data[0]); // Update to first board if not found
      } else {
        // Update the active board to reflect the latest state
        const updatedBoard = data.data.find(
          (board) => board.id === activeBoard.id
        );
        setActiveBoard(updatedBoard);
      }

      setNoBoards(data.data.length === 0);
    }
  }, [isLoading, data, activeBoard]);

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
