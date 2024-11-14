import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiLogin } from "../services/apiLogin";

function useLogin() {
  const queryClient = useQueryClient();
  const {
    mutate: login,
    isPending: isLogging,
    error,
  } = useMutation({
    mutationFn: ({ email, password }) => apiLogin(email, password),
    onSuccess: () => queryClient.invalidateQueries(["data", "all"]),
  });

  return { login, isLogging, error };
}

export { useLogin };
