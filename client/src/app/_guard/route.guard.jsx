import { getTokenFromStorage } from "./auth.guard";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const ProctedRouteGuard = ({ children }) => {
  const userToken = JSON.parse(getTokenFromStorage());
  const token = userToken ? userToken.token : null;

  // if the user has token then automatically redirect to dashboard.
  if (!token) {
    return <Navigate to="/" />;  
  }
  return children;
};

const IsloginGuard = ({ children }) =>{
  const isUserToken = JSON.parse(getTokenFromStorage());
  const isToken = isUserToken ? isUserToken.token : null;

  // if the user has not token then automatically redirect to Home page.
  if(isToken){
    return <Navigate to="/dashboard/home" />;   
  }
  return children;
}

ProctedRouteGuard.propTypes = {
  children: PropTypes.node.isRequired
};

IsloginGuard.propTypes = {
  children: PropTypes.node.isRequired
};

export {ProctedRouteGuard, IsloginGuard};
