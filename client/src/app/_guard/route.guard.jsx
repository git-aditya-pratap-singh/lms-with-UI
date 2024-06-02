import { useAuthGuard } from "./auth.guard";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const ProctedRouteGuard = ({ children }) => {
  const [auth] = useAuthGuard();

  if (!auth?.token) {
    return <Navigate to="/" />;
  }
  return children;
};

ProctedRouteGuard.propTypes = {
    children: PropTypes.node.isRequired
};

export default ProctedRouteGuard;
