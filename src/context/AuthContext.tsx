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
  login: (email: string, password: string) => Promise<AuthUser>;
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
      const token = localStorage.getItem("accessToken");

      // Skip API call if no token exists - avoids 401 error on initial load
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const data = await getMeRequest();
        setUser(data.user);
      } catch {
        // Token is invalid or expired - clear it
        localStorage.removeItem("accessToken");
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

  const login = async (email: string, password: string): Promise<AuthUser> => {
    const res = await loginRequest({ email, password });

    console.log("[v0] Login response:", res);

    const token = res.accessToken;

    if (!token) {
      throw new Error("Login failed: accessToken missing");
    }

    localStorage.setItem("accessToken", token);

    // Use user data from login response if available (avoids extra /auth/me call)
    // Most backends return user data along with the token
    if (res.user) {
      console.log("[v0] Using user from login response:", res.user);
      setUser(res.user);
      return res.user;
    }

    // Fallback: fetch user data separately if not included in login response
    console.log("[v0] Token saved, fetching user data from /auth/me...");
    const me = await getMeRequest();
    console.log("[v0] getMeRequest response:", me);
    setUser(me.user);
    return me.user;
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
