// src/components/ProtectedRoute.tsx
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = useSelector((state: any) => state.auth.token);

  // Si pas de token → redirection vers /login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
