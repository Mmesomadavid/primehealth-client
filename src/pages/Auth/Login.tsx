'use client';

import React, { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

import { Link } from "react-router-dom";

import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import GoogleIcon from "../../assets/icons/google-icon.png"; // <-- your google icon path
import Logo from "../../components/Logo"; // <-- import your Logo component

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
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

        {/* Logo */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="mb-6 flex justify-center"
        >
          <Logo variant="secondary"/>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md mx-auto space-y-6"
        >

          {/* Google Button */}
          <motion.div variants={itemVariants}>
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 border border-gray-300 hover:bg-gray-50 transition-colors bg-transparent flex items-center justify-center gap-3"
            >
              <img src={GoogleIcon} alt="Google" className="w-5 h-5" />
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
              Sign in
            </motion.button>
          </motion.div>
        </motion.form>

        {/* Footer */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible" className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-4">
            Do you have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:underline font-medium">
              Create Account
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

export default Login;
