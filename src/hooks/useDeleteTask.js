import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiDeleteTask } from "../services/apiDeleteTask";

function useDeleteTask() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteTask,
    isPending: isDeletingTask,
    error,
  } = useMutation({
    mutationFn: ({ boardId, columnId, taskId }) =>
      apiDeleteTask(boardId, columnId, taskId),
    onSuccess: () => queryClient.invalidateQueries("userData"),
  });

  return { deleteTask, isDeletingTask, error };
}

export { useDeleteTask };
