import { useMutation } from "@tanstack/react-query";
import { apiLogin } from "../services/apiLogin";

function useLogin() {
  const {
    mutate: login,
    isPending: isLogging,
    error,
  } = useMutation({
    mutationFn: ({ email, password }) => apiLogin(email, password),
  });

  return { login, isLogging, error };
}

export { useLogin };
