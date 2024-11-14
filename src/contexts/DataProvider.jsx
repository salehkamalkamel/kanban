import { createContext, useContext, useMemo } from "react";
import { useGetData } from "../hooks/useGetData";

const DataContext = createContext();

export function useDataContext() {
  return useContext(DataContext);
}

export default function DataProvider({ children }) {
  const { data, isLoading, error } = useGetData("all");

  // Extract boards safely using optional chaining
  const boards = data?.data?.boards || [];

  const getBoardById = (boardId) => {
    const board = boards.find((board) => board.id === boardId);
    return board;
  };
  // Create a reusable method to get columns safely
  const getColumnsForBoard = (boardId) => {
    const currentBoard = boards.find((board) => board.id === boardId);
    return currentBoard ? currentBoard.columns : [];
  };

  // Enhanced getColumn function
  const getColumn = useMemo(
    () => (boardId, columnId) => {
      const columns = getColumnsForBoard(boardId);
      return columns.find((column) => column.id === columnId) || null;
    },
    [boards]
  );

  // Enhanced getTask function
  const getTask = useMemo(
    () => (boardId, columnId, taskId) => {
      const column = getColumn(boardId, columnId);
      if (column) {
        return column.tasks.find((task) => task.id === taskId) || null;
      }
      return null;
    },
    [boards, getColumn]
  );

  // Memoize context value to optimize performance
  const contextValue = useMemo(
    () => ({
      data,
      boards,
      columns: boards.flatMap((board) => board.columns || []),
      isLoading,
      error,
      getColumn,
      getColumnsForBoard,
      getTask,
      getBoardById,
    }),
    [data, isLoading, error, getColumn, getTask]
  );

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
}
