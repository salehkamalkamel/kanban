import { useMutation } from "@tanstack/react-query";
import { apiSignUp } from "../services/apiSignUp";

function useSignUp() {
  const {
    mutate: signUp,
    isPending: isSigningUp,
    error,
  } = useMutation({
    mutationFn: ({ email, password }) => apiSignUp(email, password),
    onSuccess: (data) => console.log(data),
  });

  return { signUp, isSigningUp, error };
}

export { useSignUp };
