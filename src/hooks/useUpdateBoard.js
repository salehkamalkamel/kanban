import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiUpdateBoard } from "../services/apiUpdateBoard ";

function useUpdateBoard() {
  const queryClient = useQueryClient();
  const {
    mutate: updateBoard,
    isPending: isUpdatingBoard,
    error,
  } = useMutation({
    mutationFn: ({ updatedBoard }) => apiUpdateBoard(updatedBoard),
    onSuccess: () => queryClient.invalidateQueries("userData"),
  });

  return { updateBoard, isUpdatingBoard, error };
}

export { useUpdateBoard };
