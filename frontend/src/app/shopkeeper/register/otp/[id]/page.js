"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
  
import Cookies from "js-cookie";

export default function OTPVerification() {
  const router = useRouter()
 
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds

  useEffect(() => {
    // Extract phone number from the URL path
    const pathSegments = window.location.pathname.split('/')
    const phoneFromPath = pathSegments[pathSegments.length - 1]

    if (phoneFromPath) {
      setPhone(phoneFromPath)
    }

    // Set up countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Rest of the code remains the same as in the original component...
  // (formatTime, handleOtpChange, handleKeyDown, verifyOtp, resendOtp functions)
  // ... (keep the entire existing implementation)

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Handle input change for OTP fields
  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(0, 1)
    }

    // Only allow numbers
    if (value && !/^\d+$/.test(value)) {
      return
    }

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      if (nextInput) {
        nextInput.focus()
      }
    }
  }

  // Handle key down for backspace navigation
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      if (prevInput) {
        prevInput.focus()
      }
    }
  }

  // Handle OTP verification
  const verifyOtp = async () => {
    const otpValue = otp.join("")

    if (otpValue.length !== 6) {
      toast("Please enter the complete 6-digit OTP")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await axios.post("http://localhost:4000/api/shops/verifyOtp", {
        phone,
        otp: otpValue,
      })

      if (response.data.success) {
        toast("Your shop has been registered successfully!")

        Cookies.set("shopkeeperToken", response.data.token, { expires: 7 }); // expires in 7 day
        // Redirect to login or dashboard
        setTimeout(() => {
          router.push("/shopkeeper/dashboard")
        }, 2000)
      } else {
        toast(response.data.message || "Invalid OTP. Please try again.")
      }
    } catch (error) {
      console.error("OTP verification error:", error)

      const errorMessage = error.response?.data?.message || "Failed to verify OTP"
      toast(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle resend OTP
  const resendOtp = async () => {
    if (timeLeft > 0) return

    try {
      const response = await axios.post("http://localhost:4000/api/shops/resend-otp", {
        phone,
      })

      if (response.data.success) {
        toast("A new OTP has been sent to your phone")

        // Reset timer
        setTimeLeft(300)
      } else {
        toast(response.data.message || "Please try again later")
      }
    } catch (error) {
      console.error("Resend OTP error:", error)
      toast("Failed to resend OTP. Please try again later.")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Verify Your Phone</CardTitle>
          <CardDescription>We've sent a 6-digit OTP to {phone ? phone : "your phone"}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="text-center text-sm text-muted-foreground mb-4">Enter the 6-digit code below</div>
              <div className="flex justify-center gap-2">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-lg"
                    autoFocus={index === 0}
                  />
                ))}
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Time remaining: <span className={timeLeft < 60 ? "text-destructive" : ""}>{formatTime(timeLeft)}</span>
              </p>
            </div>

            <Button className="w-full" onClick={verifyOtp} disabled={isSubmitting || otp.join("").length !== 6}>
              {isSubmitting ? "Verifying..." : "Verify OTP"}
            </Button>

            <div className="text-center">
              <Button variant="link" onClick={resendOtp} disabled={timeLeft > 0} className="text-sm">
                {timeLeft > 0 ? `Resend OTP in ${formatTime(timeLeft)}` : "Resend OTP"}
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Having trouble?{" "}
            <a href="#" className="text-primary hover:underline">
              Contact Support
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}