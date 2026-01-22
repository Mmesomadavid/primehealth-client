'use client';

import React, { useState, useContext } from "react";
import { motion, type Variants } from "framer-motion";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, Phone, Building } from "lucide-react";
import { toast } from "sonner";
import Otp from "../../components/Otp";

import { AuthContext } from "../../context/AuthContext";
import type { RegisterPayload } from "../../api/auth.api";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
  password: string;
  adminFullName?: string;
}

type UserRole = 'doctor' | 'organization' | null;

const Register = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const [userRole, setUserRole] = useState<UserRole>(null);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    countryCode: '+234',
    password: '',
    adminFullName: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // OTP Dialog state
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!auth) return;

    if (!userRole) {
      toast.error("Account type required", {
        description: "Please select account type.",
      });
      return;
    }

    setLoading(true);

    try {
      const payload: RegisterPayload = {
        firstName: String(formData.firstName).trim(),
        lastName: String(formData.lastName).trim(),
        email: String(formData.email).trim(),
        phone: String(formData.phone).trim(),
        countryCode: String(formData.countryCode).trim(),
        password: String(formData.password),
        userRole: userRole as "doctor" | "organization",
        adminFullName: userRole === "organization" ? String(formData.adminFullName || '').trim() : undefined,
      };

      console.log("REGISTER PAYLOAD:", payload);
      await auth.register(payload);

      toast.success("Registration successful", {
        description: "Please verify your email with the OTP code sent to you.",
      });

      // Store email and open OTP dialog
      setRegisteredEmail(formData.email.trim());
      setOtpDialogOpen(true);
    } catch (err: any) {
      toast.error("Registration failed", {
        description: err?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerifySuccess = () => {
    setOtpDialogOpen(false);
    toast.success("Email verified", {
      description: "Your account has been verified. Redirecting to login...",
    });
    navigate("/login");
  };

  const handleOtpClose = () => {
    setOtpDialogOpen(false);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const buttonHoverVariants: Variants = {
    hover: {
      scale: 1.02,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    },
  };

  return (
    <>
      <main className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          {/* Role Selection */}
          {!userRole ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="w-full max-w-md mx-auto space-y-6"
            >
              <motion.div variants={itemVariants} className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-2">Join Stellar Health</h2>
                <p className="text-muted-foreground">Select your account type to get started</p>
              </motion.div>

              <motion.button
                variants={itemVariants}
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
                onClick={() => setUserRole('doctor')}
                className="w-full p-6 border-2 border-border rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950 transition-all text-left group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                    <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400">Healthcare Professional</h3>
                    <p className="text-sm text-muted-foreground mt-1">Sign up as a doctor, nurse, or other healthcare professional</p>
                  </div>
                </div>
              </motion.button>

              <motion.button
                variants={itemVariants}
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
                onClick={() => setUserRole('organization')}
                className="w-full p-6 border-2 border-border rounded-lg hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-950 transition-all text-left group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center group-hover:bg-green-200 dark:group-hover:bg-green-800 transition-colors">
                    <Building className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground group-hover:text-green-600 dark:group-hover:text-green-400">Health Organization</h3>
                    <p className="text-sm text-muted-foreground mt-1">Sign up as a hospital, clinic, or healthcare facility</p>
                  </div>
                </div>
              </motion.button>
            </motion.div>
          ) : (
            <div className="w-full max-w-md mx-auto space-y-6">
              {/* Back Button */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <button
                  type="button"
                  onClick={() => setUserRole(null)}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Change account type
                </button>
              </motion.div>

              {/* Form */}
              <motion.form
                onSubmit={handleSubmit}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                {/* Account Type Badge */}
                <motion.div variants={itemVariants} className="flex justify-center">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                    userRole === 'doctor'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                      : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                  }`}>
                    {userRole === 'doctor' ? 'Signing up as Healthcare Professional' : 'Signing up as Health Organization'}
                  </div>
                </motion.div>

                {/* Google Button */}
                <motion.div variants={itemVariants}>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-12 border border-border hover:bg-accent transition-colors bg-transparent flex items-center justify-center gap-3"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Sign in with Google
                  </Button>
                </motion.div>

                {/* Divider */}
                <motion.div variants={itemVariants} className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-background text-muted-foreground">or</span>
                  </div>
                </motion.div>

                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <motion.div variants={itemVariants} className="relative">
                    <label className="block text-sm font-medium text-foreground mb-2">First name</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <User size={18} />
                      </span>
                      <Input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="John"
                        className="h-12 rounded-xl pl-10"
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="relative">
                    <label className="block text-sm font-medium text-foreground mb-2">Last name</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <User size={18} />
                      </span>
                      <Input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Doe"
                        className="h-12 rounded-xl pl-10"
                        required
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Email */}
                <motion.div variants={itemVariants} className="relative">
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <Mail size={18} />
                    </span>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className="h-12 rounded-xl pl-10"
                      required
                    />
                  </div>
                </motion.div>

                {/* Phone with Country Code */}
                <motion.div variants={itemVariants} className="relative">
                  <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                  <div className="flex gap-2">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleInputChange}
                      className="w-24 h-12 px-3 border border-input rounded-xl bg-background text-sm font-medium text-foreground"
                    >
                      <option value="+234">+234 (NGN)</option>
                    </select>
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <Phone size={18} />
                      </span>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                        className="h-12 rounded-xl pl-10"
                        required
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Admin Full Name (Organization Only) */}
                {userRole === 'organization' && (
                  <motion.div variants={itemVariants} className="relative">
                    <label className="block text-sm font-medium text-foreground mb-2">Admin Full Name</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <User size={18} />
                      </span>
                      <Input
                        type="text"
                        name="adminFullName"
                        value={formData.adminFullName || ''}
                        onChange={handleInputChange}
                        placeholder="Full name of organization admin"
                        className="h-12 rounded-xl pl-10"
                        required
                      />
                    </div>
                  </motion.div>
                )}

                {/* Password */}
                <motion.div variants={itemVariants} className="relative">
                  <label className="block text-sm font-medium text-foreground mb-2">Password</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <Lock size={18} />
                    </span>
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      className="h-12 rounded-xl pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </motion.div>

                {/* Submit */}
                <motion.div variants={itemVariants}>
                  <motion.button
                    whileHover="hover"
                    variants={buttonHoverVariants}
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 bg-blue-600 hover:bg-blue-600/90 text-primary-foreground font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Signing up..." : "Sign up"}
                  </motion.button>
                </motion.div>
              </motion.form>
            </div>
          )}

          {/* Footer */}
          <motion.div variants={itemVariants} initial="hidden" animate="visible" className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Do you have an account?{' '}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Log In
              </Link>
            </p>
            <p className="text-xs text-muted-foreground">
              Signing up for a Stellar account means you agree to the{' '}
              <a href="#" className="text-primary hover:underline">Privacy Policy</a> and{' '}
              <a href="#" className="text-primary hover:underline">Terms of Service</a>.
            </p>
          </motion.div>
        </motion.div>
      </main>

      {/* OTP Verification Dialog */}
      <Otp
        open={otpDialogOpen}
        email={registeredEmail}
        onClose={handleOtpClose}
        onVerifySuccess={handleOtpVerifySuccess}
      />
    </>
  );
};

export default Register;
