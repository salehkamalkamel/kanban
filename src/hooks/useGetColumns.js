import { useQuery } from "@tanstack/react-query";
import { apiGetColumns } from "../services/apiGetColumns";

function useGetColumns(boardId) {
  const {
    data,
    isLoading: gettingColumns,
    error,
  } = useQuery({
    queryKey: ["columns", boardId], // Use the boardId to scope the query
    queryFn: () => apiGetColumns(boardId), // Pass the boardId to the API function
    enabled: !!boardId, // Only run the query if boardId is provided
  });

  const columns = data?.columns || []; // Extract columns or default to an empty array
  return { columns, gettingColumns, error };
}

export { useGetColumns };
