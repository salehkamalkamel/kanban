import { useActiveBoardContext } from "../../contexts/ActiveBoard";
import { useDeleteTask } from "../../hooks/useDeleteTask";
import ConfirmPopup from "../../ui/ConfirmPopup";

export default function DeleteTaskWindow({ onClose, columnId, task }) {
  const { activeBoardId } = useActiveBoardContext();
  const { deleteTask, isDeletingTask } = useDeleteTask();

  function handleDeleteTask() {
    deleteTask(
      { boardId: activeBoardId, columnId, taskId: task.id },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  }

  return (
    <ConfirmPopup
      onClose={onClose}
      isDoing={isDeletingTask}
      onConfirm={handleDeleteTask}
      heading="Delete this Task?"
    >
      Are you sure you want to delete the
      <span className="text-red1">
        {task.title[0].toUpperCase() + task.title.slice(1)}
      </span>
      Task? This action will remove all Sub Tasks and Task and cannot be
      reversed.
    </ConfirmPopup>
  );
}
