import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiDeleteBoard } from "../services/apiDeleteBoard";

function useDeleteBoard() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteBoard,
    isPending: isDeletingBoard,
    error,
  } = useMutation({
    mutationFn: ({ boardId }) => apiDeleteBoard(boardId),
    onSuccess: () => queryClient.invalidateQueries(["data", "all"]),
  });

  return { deleteBoard, isDeletingBoard, error };
}

export { useDeleteBoard };
