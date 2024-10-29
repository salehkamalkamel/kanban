import { useQuery } from "@tanstack/react-query";
import { apiGetUserData } from "../services/apiGetUserData";

function useGetUserData() {
  const {
    data,
    isLoading: gettingUserData,
    error,
  } = useQuery({
    queryKey: ["userData"],
    queryFn: apiGetUserData,
  });

  const userData = data?.data;
  return { userData, gettingUserData, error };
}

export { useGetUserData };
