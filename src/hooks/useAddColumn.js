import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiAddColumn } from "../services/apiAddColumn";

function useAddColumn() {
  const queryClient = useQueryClient();
  const {
    mutate: addColumn,
    isPending: isAddingColumn,
    error,
  } = useMutation({
    mutationFn: ({ boardId, newColumn }) => apiAddColumn(boardId, newColumn),
    onSuccess: () => queryClient.invalidateQueries("userData"),
  });

  return { addColumn, isAddingColumn, error };
}

export { useAddColumn };
