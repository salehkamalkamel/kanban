import { createContext, useContext, useState, useEffect } from "react";
import { useGetUserData } from "../hooks/useGetUserData";

const ActiveBoard = createContext();
const useActiveBoardContext = () => useContext(ActiveBoard);

export default function ActiveBoardContext({ children }) {
  const { userData, gettingUserData } = useGetUserData();
  const [activeBoard, setActiveBoard] = useState(null);
  const [noBoards, setNoBoards] = useState(false);

  // Use useEffect to avoid setting state during render
  useEffect(() => {
    if (!gettingUserData && userData?.boards?.length === 0) {
      setNoBoards(true);
      setActiveBoard(null);
    }

    if (!gettingUserData && userData?.boards.length > 0 && !activeBoard) {
      setActiveBoard(userData?.boards[0]);
      setNoBoards(false);
    }
  }, [gettingUserData, userData, userData?.boards, activeBoard]);

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
