'use client';

import React, { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

import { Link } from "react-router-dom";

import { User, Mail, Lock, Eye, EyeOff, Phone, Building } from "lucide-react";
import GoogleIcon from "../../assets/icons/google-icon.png"; // <-- your google icon path

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
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    countryCode: '+1',
    password: '',
    adminFullName: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', { ...formData, userRole });
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
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Join Stellar Health</h2>
              <p className="text-gray-600">Select your account type to get started</p>
            </motion.div>

            <motion.button
              variants={itemVariants}
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
              onClick={() => setUserRole('doctor')}
              className="w-full p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">Healthcare Professional</h3>
                  <p className="text-sm text-gray-600 mt-1">Sign up as a doctor, nurse, or other healthcare professional</p>
                </div>
              </div>
            </motion.button>

            <motion.button
              variants={itemVariants}
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
              onClick={() => setUserRole('organization')}
              className="w-full p-6 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all text-left group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <Building className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 group-hover:text-green-600">Health Organization</h3>
                  <p className="text-sm text-gray-600 mt-1">Sign up as a hospital, clinic, or healthcare facility</p>
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
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
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
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-green-100 text-green-700'
                }`}>
                  {userRole === 'doctor' ? 'Signing up as Healthcare Professional' : ' Signing up as Health Organization'}
                </div>
              </motion.div>

              {/* Google Button */}
              <motion.div variants={itemVariants}>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 border border-gray-300 hover:bg-gray-50 transition-colors bg-transparent flex items-center justify-center gap-3"
                >
                  <img src={GoogleIcon || "/placeholder.svg"} alt="Google" className="w-5 h-5" />
                  Sign in with Google
                </Button>
              </motion.div>

              {/* Divider */}
              <motion.div variants={itemVariants} className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </motion.div>

              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div variants={itemVariants} className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">First name</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <User size={18} />
                    </span>
                    <Input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="John"
                      className="h-12 rounded-xl pl-10"
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last name</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <User size={18} />
                    </span>
                    <Input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Doe"
                      className="h-12 rounded-xl pl-10"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Email */}
              <motion.div variants={itemVariants} className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Mail size={18} />
                  </span>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="h-12 rounded-xl pl-10"
                  />
                </div>
              </motion.div>

              {/* Phone with Country Code */}
              <motion.div variants={itemVariants} className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <div className="flex gap-2">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleInputChange}
                    className="w-24 h-12 px-3 border border-gray-300 rounded-xl bg-white text-sm font-medium text-gray-700"
                  >
                    <option value="+1">+1 (US)</option>
                    <option value="+44">+44 (UK)</option>
                    <option value="+91">+91 (IN)</option>
                    <option value="+81">+81 (JP)</option>
                    <option value="+61">+61 (AU)</option>
                    <option value="+33">+33 (FR)</option>
                    <option value="+49">+49 (DE)</option>
                    <option value="+39">+39 (IT)</option>
                    <option value="+34">+34 (ES)</option>
                    <option value="+86">+86 (CN)</option>
                  </select>
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <Phone size={18} />
                    </span>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      className="h-12 rounded-xl pl-10"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Admin Full Name (Organization Only) */}
              {userRole === 'organization' && (
                <motion.div variants={itemVariants} className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Admin Full Name</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <User size={18} />
                    </span>
                    <Input
                      type="text"
                      name="adminFullName"
                      value={formData.adminFullName || ''}
                      onChange={handleInputChange}
                      placeholder="Full name of organization admin"
                      className="h-12 rounded-xl pl-10"
                    />
                  </div>
                </motion.div>
              )}

              {/* Password */}
              <motion.div variants={itemVariants} className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock size={18} />
                  </span>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="h-12 rounded-xl pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
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
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
                >
                  Sign up
                </motion.button>
              </motion.div>
            </motion.form>
          </div>
        )}

        {/* Footer */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible" className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-4">
            Do you have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline font-medium">
              Log In
            </Link>
          </p>
          <p className="text-xs text-gray-500">
            Signing up for a Stellar account means you agree to the{' '}
            <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> and{' '}
            <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>.
          </p>
        </motion.div>
      </motion.div>
    </main>
  );
};

export default Register;
