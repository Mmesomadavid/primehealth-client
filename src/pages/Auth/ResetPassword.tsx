"use client";

import { Mail, Send } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../../components/ui/input-otp";
import { Separator } from "../../components/ui/separator";
import { useState } from "react";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [codeRequested, setCodeRequested] = useState(false);

  const handleRequestCode = () => {
    if (!email) return;
    setCodeRequested(true);
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-12 items-center">

        {/* LEFT SECTION */}
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl md:text-3xl font-semibold mb-3">
            Reset your password
          </h1>

          <p className="text-muted-foreground mb-8 max-w-md">
            Enter your email address and we’ll send you a verification code to
            reset your password.
          </p>

          <div className="space-y-4 max-w-md">
            {/* Email input */}
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 pl-10 rounded-xl"
              />
            </div>

            {/* Request code */}
            <div className="flex justify-end">
              <Button
                onClick={handleRequestCode}
                className="h-11 px-6 bg-black hover:bg-black/90 rounded-full flex items-center gap-2"
              >
                Request code
                <Send size={16} />
              </Button>
            </div>

            {/* Remember login */}
            <p className="text-sm text-muted-foreground">
              I remember my details?{" "}
              <Link
                to="/login"
                className="text-black font-medium hover:underline"
              >
                Try login
              </Link>
            </p>
          </div>
        </div>

        {/* SEPARATOR */}
        <Separator orientation="vertical" className="hidden md:block h-64" />
        <Separator orientation="horizontal" className="md:hidden my-6" />

        {/* RIGHT SECTION */}
        <div
          className={`
            flex flex-col items-center justify-center
            ${
              codeRequested
                ? "block"
                : "hidden md:flex"
            }
          `}
        >
          <h2 className="text-lg font-medium mb-6">
            Enter verification code
          </h2>

          {/* OTP */}
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => setOtp(value)}
          >
            <InputOTPGroup className="gap-2 sm:gap-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  className="
                    h-12 w-10 sm:h-14 sm:w-12
                    text-base sm:text-lg
                    rounded-lg
                    border-2
                    border-gray-500
                    focus:border-black
                    focus:ring-0
                  "
                />
              ))}
            </InputOTPGroup>
          </InputOTP>

          {/* Submit code */}
          <Button className="mt-8 w-full max-w-xs h-12 bg-black hover:bg-black/90 rounded-full">
            Submit code
          </Button>
        </div>

      </div>
    </main>
  );
};

export default ResetPassword;
