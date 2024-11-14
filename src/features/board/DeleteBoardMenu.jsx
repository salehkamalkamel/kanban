import { useEffect, useState } from "react";
import { useActiveBoardContext } from "../../contexts/ActiveBoard";
import { useDataContext } from "../../contexts/DataProvider";
import { useDeleteBoard } from "../../hooks/useDeleteBoard";
import ConfirmPopup from "../../ui/ConfirmPopup";

export default function DeleteBoardMenu({ onClose }) {
  const { deleteBoard, isDeletingBoard } = useDeleteBoard();
  const { handleActiveBoardId, activeBoardId } = useActiveBoardContext();
  const { boards, isLoading, getBoardById } = useDataContext();

  const [activeBoard, setActiveBoard] = useState();

  useEffect(() => {
    const board = getBoardById(activeBoardId);
    setActiveBoard(board);
  }, [activeBoardId, isLoading, getBoardById]);

  function getPrevBoardIdx() {
    if (!isLoading && boards?.length > 0) {
      const currentBoardIdx = boards?.findIndex(
        (board) => board.id === activeBoardId
      );
      return currentBoardIdx > 0 ? currentBoardIdx - 1 : -1;
    }
    return -1;
  }

  function handleDeleteBoard() {
    deleteBoard(
      { boardId: activeBoardId },
      {
        onSuccess: () => {
          const prevBoardIdx = getPrevBoardIdx();
          onClose();
          if (!isLoading) {
            if (prevBoardIdx !== -1) {
              handleActiveBoardId(boards[prevBoardIdx]?.id);
            } else {
              handleActiveBoardId(null);
            }
          }
        },
      }
    );
  }

  return (
    <ConfirmPopup
      onClose={onClose}
      isDoing={isDeletingBoard}
      onConfirm={handleDeleteBoard}
      heading="Delete this board?"
    >
      Are you sure you want to delete the
      <span className="text-red1">
        {activeBoard?.title[0].toUpperCase() + activeBoard?.title.slice(1)}{" "}
      </span>
      board? This action will remove all columns and tasks and cannot be
      reversed.
    </ConfirmPopup>
  );
}
