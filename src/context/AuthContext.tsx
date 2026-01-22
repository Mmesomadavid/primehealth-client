"use client";

import React, { createContext, useEffect, useState } from "react";

import {
  registerRequest,
  loginRequest,
  verifyOtpRequest,
  resendOtpRequest, // ✅ import resend otp
  getMeRequest,
} from "../api/auth.api";

import type { RegisterPayload } from "../api/auth.api";

/* ---------- Types ---------- */

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
  resendOtp: (email: string) => Promise<void>; // ✅ corrected signature
  logout: () => void;
};

/* ---------- Context ---------- */

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* ---------- Provider ---------- */

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  /* ---------- Init ---------- */
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

  /* ---------- Actions ---------- */

  const register = async (data: RegisterPayload) => {
    await registerRequest(data);
  };

  const login = async (email: string, password: string) => {
    const res = await loginRequest({ email, password });

    localStorage.setItem("accessToken", res.accessToken);

    const me = await getMeRequest();
    setUser(me.user);
  };

  const verifyOtp = async (email: string, otp: string) => {
    await verifyOtpRequest(email, otp);
  };

  // ✅ Resend OTP
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
        resendOtp, // ✅ add to provider
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
