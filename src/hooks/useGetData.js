import { useQuery } from "@tanstack/react-query";
import { apiGetUserData } from "../services/apiGetUserData";
import PropTypes from "prop-types";

export function useGetData(dataType = "all", payload = {}, options = {}) {
  const query = useQuery({
    queryKey: ["data", dataType, payload],
    queryFn: () => apiGetUserData(dataType, payload),
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    cacheTime: 1000 * 60 * 10, // Keep data in memory for 10 minutes
    retry: 2, // Retry twice on failure
    refetchOnWindowFocus: false, // Avoid unnecessary refetches on focus
    ...options, // Allow custom options to override defaults
  });

  return query; // Return the full query object for flexibility
}

// PropTypes for the hook function parameters
useGetData.propTypes = {
  dataType: PropTypes.oneOf(["all", "boards", "columns"]).isRequired,
  payload: PropTypes.object,
  options: PropTypes.object,
};
