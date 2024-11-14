import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiSignOut } from "../services/apiSignOut";
import { useActiveBoardContext } from "../contexts/ActiveBoard";

function useLogOut() {
  const queryClient = useQueryClient();
  const { resetActiveBoardState } = useActiveBoardContext();
  const {
    mutate: logOut,
    isPending: isLoggingOut,
    error,
  } = useMutation({
    mutationFn: apiSignOut,
    onSuccess: () => {
      resetActiveBoardState(); // Additional function to clear any cached data.
      queryClient.invalidateQueries(["data", "all"]);
      localStorage.removeItem("active-board-id");
    },
  });

  return { logOut, isLoggingOut, error };
}

export { useLogOut };
