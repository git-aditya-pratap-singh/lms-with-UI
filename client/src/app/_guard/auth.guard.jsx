import { useState, useEffect, createContext, useContext } from "react";

import PropTypes from "prop-types";

const AuthContext = createContext();

const AuthGuard = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: null
    })

    useEffect(() => {
        const data = getTokenFromStorage();
        if(data){
            const parseData = JSON.parse(data)
            setAuth({
                ...auth,
                user : parseData.userValid,
                token : parseData.token,
            }) 
        }
    }, [])

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

AuthGuard.propTypes = {
    children: PropTypes.node.isRequired
};
const useAuthGuard = () => {
    return useContext(AuthContext);
};

const storeTokenInStorage = (serverToken)=>{
    localStorage.setItem('token',JSON.stringify(serverToken))
}
const getTokenFromStorage = ()=>{
    return localStorage.getItem('token')
}
const storeTokenRemove = ()=>{
    localStorage.removeItem('token')
}

export {useAuthGuard, storeTokenInStorage, getTokenFromStorage, storeTokenRemove};
export default AuthGuard; 