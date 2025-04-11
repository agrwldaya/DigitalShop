"use client";

import React, { useState, useRef, useEffect } from "react";
import { User } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function OtpVerificationModal({ isOpen, onClose, phoneNumber }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(30);

  const inputRefs = useRef([]);

  const router = useRouter();

  useEffect(() => {
    if (isOpen && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [isOpen]);

  useEffect(() => {
    let timer;
    if (resendDisabled && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setResendDisabled(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [resendDisabled, countdown]);

  const handleOtpChange = (index, value) => {
    if (value && !/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();

    if (/^\d{6}$/.test(pastedData)) {
      const otpArray = pastedData.split("");
      setOtp(otpArray);
      inputRefs.current[5]?.focus();
    }
  };

  const handleResendOtp = () => {
    setResendDisabled(true);
    setCountdown(30);
    setTimeout(() => {
      console.log("OTP resent to", phoneNumber);
    }, 1000);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    const phoneNo = localStorage.getItem('phoneNo');
    localStorage.removeItem('phoneNo')

    if (otpValue.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:4000/api/customer/verifyotp",
        { phone: phoneNo,otp:otpValue },
        { headers: { "Content-Type": "application/json" } }
      );

      toast(response.data.message || "Login successful");
      router.push('/customer')
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || "Server error occurred";
        toast(errorMessage);
      } else {
        toast("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
              <User className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <DialogTitle className="text-center text-xl">Verify OTP</DialogTitle>
          <DialogDescription className="text-center">
            We've sent a 6-digit OTP to +91 {phoneNumber.replace(/(\d{5})(\d{5})/, "$1-$2")}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center mb-1">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className={`w-12 h-12 text-center text-lg ${error ? "border-red-500" : ""}`}
                />
              ))}
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Didn't receive the OTP?</span>{" "}
            <Button
              variant="link"
              className="p-0 h-auto text-orange-600"
              type="button"
              disabled={resendDisabled}
              onClick={handleResendOtp}
            >
              {resendDisabled ? `Resend in ${countdown}s` : "Resend OTP"}
            </Button>
          </div>

          <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Verify & Login"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}