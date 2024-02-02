import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "@/store/auth";

interface AuthGuardProps {
  children: any;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const location = useLocation();
  const pathName = location.pathname;
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const authToken = useAuthStore((state) => state.authToken);

  if ((!isLoggedIn || !authToken) && pathName.startsWith("/user")) {
    console.log(isLoggedIn, authToken, "(!isLoggedIn || !authToken)");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AuthGuard;
