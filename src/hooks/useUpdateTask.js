import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiUpdateTask } from "../services/apiUpdateTask";

function useUpdateTask() {
  const queryClient = useQueryClient();
  const {
    mutate: updateTask,
    isPending: isUpdatingTask,
    error,
  } = useMutation({
    mutationFn: ({ activeBoardId, columnId, taskId, updatedTask }) => {
      return apiUpdateTask(activeBoardId, columnId, taskId, updatedTask);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["data", "columns"]);
    },
  });

  return { updateTask, isUpdatingTask, error };
}

export { useUpdateTask };
