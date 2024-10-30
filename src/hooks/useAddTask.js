import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiAddTask } from "../services/apiAddTask";

function useAddTask() {
  const queryClient = useQueryClient(); // Access React Query cache

  const {
    mutate: addTask,
    isPending: addingTask,
    error,
  } = useMutation({
    mutationFn: ({ boardId, columnId, newTask }) =>
      apiAddTask(boardId, columnId, newTask),
    onSuccess: () => {
      // Invalidate or refetch columns to reflect the new task
      queryClient.invalidateQueries(["data", "columns"]);
    },
  });

  return { addTask, addingTask, error };
}

export { useAddTask };
