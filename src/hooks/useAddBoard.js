import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiAddBoard } from "../services/apiAddBoard";

function useAddBoard() {
  const queryClient = useQueryClient();
  const {
    mutate: addBoard,
    isPending: isAddingBoard,
    error,
  } = useMutation({
    mutationFn: ({ newBoard }) => apiAddBoard(newBoard),
    onSuccess: () => {
      queryClient.invalidateQueries(["data", "all"]);
    },
  });

  return { addBoard, isAddingBoard, error };
}

export { useAddBoard };
