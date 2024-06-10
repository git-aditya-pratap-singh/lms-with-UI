import { getTokenFromStorage } from "./auth.guard";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const ProctedRouteGuard = ({ children }) => {
  const token = getTokenFromStorage();

  if (!token) {
    return <Navigate to="/" />;
  }
  return children;
};

const IsloginGuard = () =>{
  //const token = getTokenFromStorage();

  // if(!token){
  //   return null;
  // }
  // return <Navigate to="/dashboard/home" />;
}

ProctedRouteGuard.propTypes = {
  children: PropTypes.node.isRequired
};

IsloginGuard.propTypes = {
  children: PropTypes.node.isRequired
};

export {ProctedRouteGuard, IsloginGuard};
