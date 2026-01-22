import api from "./axios";

/* ---------- Types ---------- */

export type RegisterPayload = {
  userRole: "doctor" | "organization";
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
  password: string;
  adminFullName?: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

/* ---------- Requests ---------- */

export const registerRequest = async (data: RegisterPayload) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const loginRequest = async (data: LoginPayload) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const verifyOtpRequest = async (email: string, otp: string) => {
  const res = await api.post("/auth/verify-otp", { email, otp });
  return res.data;
};

export const resendOtpRequest = async (email: string) => {
  const res = await api.post("/auth/resend-otp", { email });
  return res.data;
};

export const getMeRequest = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};
