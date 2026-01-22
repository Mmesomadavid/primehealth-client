"use client";

import React, { useEffect, useState, useContext } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { toast } from "sonner";
import { AuthContext } from "../context/AuthContext";
import { Mail } from "lucide-react";

type OtpProps = {
  open: boolean;
  email: string;
  onClose: () => void;
  onVerifySuccess: () => void;
};

const RESEND_INTERVAL = 30;

const Otp: React.FC<OtpProps> = ({
  open,
  email,
  onClose,
  onVerifySuccess,
}) => {
  const auth = useContext(AuthContext);

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timer, setTimer] = useState(RESEND_INTERVAL);

  useEffect(() => {
    if (!open) return;

    setOtp("");
    setTimer(RESEND_INTERVAL);

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [open]);

  const handleVerify = async () => {
    if (!auth) return;

    // FIXED: should be 6 digits
    if (otp.length !== 6) {
      toast.error("Invalid OTP", {
        description: "OTP must be 6 digits.",
      });
      return;
    }

    setLoading(true);

    try {
      await auth.verifyOtp(email, otp);
      toast.success("Verified", {
        description: "Email verified successfully.",
      });
      onVerifySuccess();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Invalid OTP.";
      toast.error("Verification failed", {
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!auth || timer > 0) return;

    setResendLoading(true);

    try {
      await auth.resendOtp(email);
      setTimer(RESEND_INTERVAL);

      toast.success("OTP Sent", {
        description: "A new OTP has been sent to your email.",
      });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Try again later.";
      toast.error("Resend failed", {
        description: errorMessage,
      });
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-[470px] p-8 rounded-2xl border-0 shadow-xl">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
            <Mail className="h-8 w-8 text-blue-600" strokeWidth={2} />
          </div>

          <h2 className="mb-2 text-2xl font-semibold text-foreground">
            Check your email
          </h2>

          <p className="mb-6 text-muted-foreground">
            Enter the verification code sent to
            <br />
            <span className="font-medium text-foreground">{email}</span>
          </p>

          <div className="mb-4">
            <InputOTP
              value={otp}
              maxLength={6}
              onChange={(value) => setOtp(value)}
              autoFocus
            >
              <InputOTPGroup className="gap-3">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <InputOTPSlot
                    key={idx}
                    index={idx}
                    className="h-14 w-14 rounded-lg border-2 border-muted text-2xl font-medium focus:border-blue-600 focus:ring-0 data-[active=true]:border-blue-600"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          <p className="mb-6 text-sm text-muted-foreground">
            {"Didn't get a code? "}
            {timer > 0 ? (
              <span className="text-muted-foreground/60">
                resend ({timer}s)
              </span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={resendLoading}
                className="font-medium text-blue-600 underline underline-offset-2 hover:text-blue-700 disabled:opacity-50"
              >
                {resendLoading ? "sending..." : "resend"}
              </button>
            )}
          </p>

          <Button
            className="w-full h-12 rounded-lg bg-blue-600 text-base font-medium text-white hover:bg-blue-700"
            onClick={handleVerify}
            disabled={loading || otp.length !== 6}
          >
            {loading ? "Verifying..." : "Verify email"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Otp;
