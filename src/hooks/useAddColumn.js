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
    onSuccess: async () => {
      await queryClient.invalidateQueries(["data", "boards"]);
      // queryClient.refetchQueries(["data", "boards"]);
    },
  });

  return { addColumn, isAddingColumn, error };
}

export { useAddColumn };
