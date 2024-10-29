import { useActiveBoardContext } from "../../contexts/ActiveBoard";
import { useDeleteBoard } from "../../hooks/useDeleteBoard";
import { useGetUserData } from "../../hooks/useGetUserData";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import LoadingSpinner from "../../ui/LoadingSpinner";
import PopupWindow from "../../ui/PopupWindow";

export default function DeleteBoardMenu({ onClose }) {
  const { deleteBoard, isDeletingBoard } = useDeleteBoard();
  const { userData, gettingUserData } = useGetUserData();
  const { activeBoard, handleActiveBoard } = useActiveBoardContext();

  function getPrevBoardIdx() {
    if (!gettingUserData && userData?.boards.length > 0) {
      const currentBoardIdx = userData.boards.findIndex(
        (board) => board.id === activeBoard.id
      );
      return currentBoardIdx > 0 ? currentBoardIdx - 1 : -1;
    }
    return -1;
  }

  return (
    <PopupWindow onClose={onClose}>
      <div className=" flex flex-col items-center justify-center gap-6">
        <Heading shape="l" level={2} className="text-red1 w-full">
          Delete this board?
        </Heading>
        <p className="text-gray1">
          Are you sure you want to delete the
          <span className="text-red1">
            {activeBoard.title[0].toUpperCase() + activeBoard.title.slice(1)}{" "}
          </span>
          board? This action will remove all columns and tasks and cannot be
          reversed.
        </p>
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <Button
            shape="error"
            disabled={isDeletingBoard}
            className="w-full"
            onClick={() => {
              deleteBoard(
                { boardId: activeBoard?.id },
                {
                  onSuccess: () => {
                    const prevBoardIdx = getPrevBoardIdx();
                    if (prevBoardIdx !== -1) {
                      handleActiveBoard(userData.boards[prevBoardIdx]);
                    } else {
                      handleActiveBoard(userData.boards[0]);
                    }
                    onClose();
                  },
                }
              );
            }}
          >
            {isDeletingBoard ? <LoadingSpinner /> : "Delete"}
          </Button>
          <Button
            onClick={onClose}
            disabled={isDeletingBoard}
            shape="secondary"
            className="w-full"
          >
            Cancel
          </Button>
        </div>
      </div>
    </PopupWindow>
  );
}
