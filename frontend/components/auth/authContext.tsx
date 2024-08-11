"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { checkTokenExpiration } from "./auth"

interface AuthContextType { 
    isAuthenticated: boolean; 
    login: () => void; 
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated ]  = useState(false)

    useEffect(()=> {
       const initializeAuth = async () => {
        const validToken = await checkTokenExpiration(); 
        console.log(validToken)
        setIsAuthenticated(validToken)
       }

       initializeAuth()

       const interval = setInterval(()=> {
          checkTokenExpiration().then((valid)=> setIsAuthenticated(valid))
       }, 15*60*1000)
       return () => clearInterval(interval)
    },[])

    const login = () => {
        setIsAuthenticated(true)
    }

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("refreshToken")
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
 }

 export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context) {
        throw new Error( "useAuth debe ser usado dentro de un AuthProvider")
    }

    return context
 }