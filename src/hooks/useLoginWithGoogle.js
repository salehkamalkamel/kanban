import { useMutation } from "@tanstack/react-query";
import { apiLoginWithGoogle } from "../services/apiLoginWithGoogle";

function useLogiWithGoogle() {
  const {
    mutate: loginWithGoogle,
    isPending: isLoginWithGoogle,
    error,
  } = useMutation({
    mutationFn: apiLoginWithGoogle,
    onError: (err) => {
      console.error("Google Login Error:", err.message);
    },
  });

  return { loginWithGoogle, isLoginWithGoogle, error };
}

export { useLogiWithGoogle };
