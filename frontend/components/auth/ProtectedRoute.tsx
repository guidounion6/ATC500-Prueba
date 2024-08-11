"use client"
import React, { useEffect } from 'react'
import { useAuth } from './authContext';
import { useRouter } from 'next/navigation';
import { checkTokenExpiration } from './auth';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {

    const { isAuthenticated, logout } = useAuth();
    const router = useRouter()

    useEffect(() => {
        const checkAuth = async () => {
          const validToken = await checkTokenExpiration();
          if (!validToken) {
            await logout();
            router.push('/sign-up');
          }
        };
    
        checkAuth();
      }, [isAuthenticated, logout, router]);
    
      if (!isAuthenticated) {
        return null; 
      }
    
      return <>{children}</>;
    };
    
    export default ProtectedRoute;