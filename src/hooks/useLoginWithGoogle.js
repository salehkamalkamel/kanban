import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiLoginWithGoogle } from "../services/apiLoginWithGoogle";

function useLogiWithGoogle() {
  const queryClient = useQueryClient();
  const {
    mutate: loginWithGoogle,
    isPending: isLoginWithGoogle,
    error,
  } = useMutation({
    mutationFn: apiLoginWithGoogle,
    onSuccess: () => {
      queryClient.invalidateQueries(["data", "all"]);
    },
    onError: (err) => {
      console.error("Google Login Error:", err.message);
    },
  });

  return { loginWithGoogle, isLoginWithGoogle, error };
}

export { useLogiWithGoogle };
