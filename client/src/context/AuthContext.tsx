import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "../types";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../graphql/queries";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  refetch: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const token = localStorage.getItem("token");

  const { data, loading, refetch } = useQuery(GET_ME, {
    skip: !token,
    errorPolicy: 'ignore',
  });

  useEffect(() => {
    if (data?.me) {
      setUser(data.me);
    }
  }, [data]);

  const login = (token: string, userData: User) => {
    localStorage.setItem('token', token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.reload();
  };

  const value = {
    user,
    loading: loading && !!token,
    login,
    logout,
    refetch,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
