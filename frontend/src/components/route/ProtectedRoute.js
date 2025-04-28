import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../layouts/Loader";

export default function ProtectedRoute({ 
  children, 
  isAdmin = false, 
  isShopOwner = false 
}) {
  // Get both user auth and shop auth states
  const userAuth = useSelector((state) => state.authState);
  const shopAuth = useSelector((state) => state.shopState);

  if (userAuth.loading || shopAuth.loading) {
    return <Loader />;
  }

  // For admin-protected routes
  if (isAdmin) {
    if (!userAuth.isAuthenticated || userAuth.user?.role !== "admin") {
      return <Navigate to="/login" replace />;
    }
    return children;
  }

  // For shop owner-protected routes
  if (isShopOwner) {
    if (!shopAuth.isShopAuthenticated) {
      return <Navigate to="/loginshopowner" replace />;
    }
    return children;
  }

  // For regular authenticated routes (user)
  if (!userAuth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}