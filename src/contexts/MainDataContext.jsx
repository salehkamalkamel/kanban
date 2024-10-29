import { createContext, useContext, useState } from "react";

const DataContext = createContext();
const useDataContext = () => useContext(DataContext);
export default function MainDataContext({ children }) {
  const [mainData, setMainData] = useState({});

  function getBoards() {
    return mainData.boards || [];
  }

  function addBoard(newBoard) {
    if (mainData.boards) {
      setMainData((data) => data.boards.push(newBoard));
    } else {
      mainData.boards = [];
      setMainData((data) => data.boards.push(newBoard));
    }
  }
  return (
    <DataContext.Provider value={{ addBoard, getBoards }}>
      {children}
    </DataContext.Provider>
  );
}

export { useDataContext };
