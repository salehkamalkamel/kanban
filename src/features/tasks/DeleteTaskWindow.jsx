import { useActiveBoardContext } from "../../contexts/ActiveBoard";

import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import { useDeleteTask } from "../../hooks/useDeleteTask";
import LoadingSpinner from "../../ui/LoadingSpinner";
import PopupWindow from "../../ui/PopupWindow";

export default function DeleteTaskWindow({ onClose, columnId, taskId }) {
  const { activeBoard } = useActiveBoardContext();
  const { deleteTask, isDeletingTask } = useDeleteTask();

  return (
    <PopupWindow onClose={onClose}>
      <div className=" flex flex-col items-center justify-center gap-6">
        <Heading shape="l" level={2} className="text-red1 w-full">
          Delete this Task?
        </Heading>
        <p className="text-gray1">
          Are you sure you want to delete the Name Task? This action will remove
          all columns and tasks and cannot be reversed.
        </p>
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <Button
            shape="error"
            className="w-full"
            disabled={isDeletingTask}
            onClick={() => {
              deleteTask(
                { boardId: activeBoard.id, columnId, taskId },
                {
                  onSuccess: () => {
                    onClose();
                  },
                }
              );
            }}
          >
            {isDeletingTask ? <LoadingSpinner /> : "Delete"}
          </Button>
          <Button
            disabled={isDeletingTask}
            onClick={onClose}
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
