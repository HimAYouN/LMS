import { Children, createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider  = ({Children}) =>{
    const [token, setToken] = useState(null);
}

useEffect(()=>{
    const storedToken = localStorage.getItem("Token");

    if(typeof storedToken === "string" && storedToken.trim() !== ""){
        setToken(storedToken);
    }
}, [])

const login = (newToken) = ()=> {
    localStorage.setItem("Token", newToken)
}

const logout = ()=>{
    localStorage.removeItem("Token");
    setToken(null)
}

