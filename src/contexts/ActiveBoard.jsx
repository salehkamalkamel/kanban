import { createContext, useContext, useState, useEffect } from "react";
import { useGetData } from "../hooks/useGetData";
import { auth } from "../firebase";

const ActiveBoard = createContext();
const useActiveBoardContext = () => useContext(ActiveBoard);

export default function ActiveBoardContext({ children }) {
  const { data, isLoading } = useGetData("boards");
  const [activeBoard, setActiveBoard] = useState(null);
  const [noBoards, setNoBoards] = useState(false);

  // Keep the active board in sync with user data
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(() => {
      setActiveBoard(null); // Reset active board when user changes
    });
    return unsubscribe;
  }, []);

  // Update active board based on data availability
  useEffect(() => {
    if (!isLoading) {
      if (data?.data.length === 0) {
        setActiveBoard(null);
        setNoBoards(true);
      } else if (!activeBoard) {
        setActiveBoard(data?.data[0]); // Set first board as default if none is active
        setNoBoards(false);
      }
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
