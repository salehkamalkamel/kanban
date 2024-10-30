import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import LoadingSpinner from "../../ui/LoadingSpinner";
import BodyText from "../../ui/Bodytext";

function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="w-full h-[100vh] flex items-center justify-center bg-gray3 dark:bg-black3">
        <div className="flex items-center justify-center gap-4">
          <LoadingSpinner />
          <BodyText shape="bodyL" className="text-gray1 w-max">
            Loading...
          </BodyText>
        </div>
      </div>
    );
  }
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
