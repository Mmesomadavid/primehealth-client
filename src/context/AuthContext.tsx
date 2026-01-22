"use client";

import React, { createContext, useEffect, useState } from "react";

import {
  registerRequest,
  loginRequest,
  verifyOtpRequest,
  resendOtpRequest,
  getMeRequest,
} from "../api/auth.api";

import type { RegisterPayload } from "../api/auth.api";

export type AuthUser = {
  id: string;
  email: string;
  role: "OWNER" | "DOCTOR";
  organizationId: string;
  firstName: string;
  lastName: string;
};

type AuthContextType = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  register: (data: RegisterPayload) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  verifyOtp: (email: string, otp: string) => Promise<void>;
  resendOtp: (email: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  useEffect(() => {
    const initAuth = async () => {
      try {
        const data = await getMeRequest();
        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const register = async (data: RegisterPayload) => {
    await registerRequest(data);
  };

  const login = async (email: string, password: string) => {
    const res = await loginRequest({ email, password });

    // ✔️ token is inside res (because auth.api returns res.data)
    const token = res.accessToken;

    if (!token) {
      throw new Error("Login failed: accessToken missing");
    }

    localStorage.setItem("accessToken", token);

    const me = await getMeRequest();
    setUser(me.user);
  };

  const verifyOtp = async (email: string, otp: string) => {
    await verifyOtpRequest(email, otp);
  };

  const resendOtp = async (email: string) => {
    await resendOtpRequest(email);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        register,
        login,
        verifyOtp,
        resendOtp,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
