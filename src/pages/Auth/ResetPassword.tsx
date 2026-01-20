"use client";

import { Mail, Send } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../../components/ui/input-otp";
import { useState } from "react";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10 p-8 md:p-12">

        {/* LEFT SECTION */}
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl md:text-3xl font-semibold mb-3">
            Reset your password
          </h1>

          <p className="text-muted-foreground mb-8">
            Enter your email address and we’ll send you a verification code to
            reset your password.
          </p>

          {/* Email input */}
          <div className="space-y-4">
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

            {/* Request code button (right aligned) */}
            <div className="flex justify-end">
              <Button className="h-11 px-6 bg-black hover:bg-black/90 rounded-full flex items-center">
                Request code
                <Send/>
              </Button>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-lg font-medium mb-4">
            Enter verification code
          </h2>

          {/* OTP */}
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => setOtp(value)}
          >
            <InputOTPGroup className="gap-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  className="h-16 w-14 text-lg rounded-xl"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>

          {/* Submit code */}
          <Button className="mt-6 w-full max-w-xs  h-12 bg-black hover:bg-blsack/90">
            Submit code
          </Button>
        </div>
      </div>
    </main>
  );
};

export default ResetPassword;
