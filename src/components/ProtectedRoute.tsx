import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../lib/auth-storage';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  if (!isAuthenticated()) {
    return <Navigate replace to="/login" />;
  }

  return children;
}
