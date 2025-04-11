"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import router
import { Eye, EyeOff, Store } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import axios from "axios";
import Cookies from "js-cookie";

export function ShopkeeperLoginModal({ isOpen, onClose }) {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ phoneNumber: "", password: "" });

  const validateForm = () => {
    const newErrors = { phoneNumber: "", password: "" };
    let isValid = true;

    if (!/^\d{10}$/.test(phoneNumber)) {
      newErrors.phoneNumber = "Enter a valid 10-digit phone number.";
      isValid = false;
    }
    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:4000/api/shops/login",
        { phone: phoneNumber, password },
        { headers: { "Content-Type": "application/json" } }
      );
      if(response.data.success){

        console.log("response.data.token",response.data.token);
        
        Cookies.set("shopkeeperToken", response.data.token, { expires: 7 }); 
        toast(response.data.message || "Login successful");
        router.push("/shopkeeper/dashboard");
        onclose = true;
        isOpen= false;
      }else{
        toast(response.data.message || "Something went wrong!");
      }
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
              <Store className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <DialogTitle className="text-center text-xl">Shopkeeper Login</DialogTitle>
          <DialogDescription className="text-center">
            Enter your credentials to access your shop dashboard
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your 10-digit phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={errors.phoneNumber ? "border-red-500" : ""}
            />
            {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Password</Label>
              <Button variant="link" className="p-0 h-auto text-xs text-orange-600" type="button">
                Forgot Password?
              </Button>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={errors.password ? "border-red-500 pr-10" : "pr-10"}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="remember" checked={rememberMe} onCheckedChange={setRememberMe} />
            <label htmlFor="remember" className="text-sm font-medium leading-none">
              Remember me
            </label>
          </div>

          <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Don't have an account?</span>{" "}
            <Button variant="link" className="p-0 h-auto text-orange-600">
              Register as Shopkeeper
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
