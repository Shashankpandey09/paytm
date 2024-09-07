import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ element }) => {
  const { token } = useSelector((store) => store.signup.data);

  return token ? element : <Navigate to="/signIn" />;
};

export default ProtectedRoutes;
