"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  Check,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  // Register form state
  const [registerForm, setRegisterForm] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
    newsletterSignup: false,
  });

  // Form validation state
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    termsAccepted: "",
  });

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterForm({ ...registerForm, [name]: value });

    // Clear error when user types
    setErrors({
      ...errors,
      [name]: "",
    });
    setRegisterError(null);

    // Check password strength
    if (name === "password") {
      checkPasswordStrength(value);
    }
  };

  // Handle checkbox change
  const handleCheckboxChange = (checked: boolean, name: string) => {
    setRegisterForm({ ...registerForm, [name]: checked });

    if (name === "termsAccepted") {
      setErrors({
        ...errors,
        termsAccepted: "",
      });
    }
  };

  // Check password strength
  const checkPasswordStrength = (password: string) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    };

    setPasswordRequirements(requirements);

    // Calculate strength percentage
    const metRequirements = Object.values(requirements).filter(Boolean).length;
    const strengthPercentage = (metRequirements / 5) * 100;
    setPasswordStrength(strengthPercentage);
  };

  // Update confirm password error when password changes
  useEffect(() => {
    if (
      registerForm.confirmPassword &&
      registerForm.password !== registerForm.confirmPassword
    ) {
      setErrors({
        ...errors,
        confirmPassword: "Passwords do not match",
      });
    } else if (registerForm.confirmPassword) {
      setErrors({
        ...errors,
        confirmPassword: "",
      });
    }
  }, [registerForm.password, registerForm.confirmPassword]);

  // Validate form
  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!registerForm.fullName.trim()) {
      newErrors.fullName = "Full name is required";
      valid = false;
    }

    if (!registerForm.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(registerForm.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    if (!registerForm.username.trim()) {
      newErrors.username = "Username is required";
      valid = false;
    } else if (registerForm.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
      valid = false;
    }

    if (!registerForm.password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (passwordStrength < 60) {
      newErrors.password = "Password is too weak";
      valid = false;
    }

    if (!registerForm.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
      valid = false;
    } else if (registerForm.password !== registerForm.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    if (!registerForm.termsAccepted) {
      newErrors.termsAccepted = "You must accept the terms and conditions";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);
      setRegisterError(null);

      try {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: registerForm.fullName,
            email: registerForm.email,
            username: registerForm.username,
            password: registerForm.password,
          }),
        });

        const data = await response.json();
        localStorage.setItem("verificationToken", data.verificationToken);
        localStorage.setItem("email", data.email);

        if (!response.ok) {
          throw new Error(data.error); 
        }

        setRegisterSuccess(true);

        //* Redirect to verification page after a short delay
        setTimeout(() => {
          router.push("/auth/verify-email");
        }, 1500);
      } catch (error: any) {
        console.error("Registration error:", error);
        setRegisterError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-muted">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-background/5 to-secondary/10" />
        <div className="relative w-full h-full flex items-center justify-center p-12">
          <div className="max-w-lg">
            <div className="mb-8">
              <Link
                href="/"
                className="flex items-center gap-2 text-2xl font-bold"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground">
                  <User className="w-5 h-5" />
                </div>
                BlogFolio
              </Link>
            </div>
            <h1 className="text-4xl font-bold mb-4">Join Our Community</h1>
            <p className="text-muted-foreground mb-8">
              Create an account to start sharing your knowledge and connecting
              with like-minded individuals. Become a part of our growing
              community of writers and readers.
            </p>
            <div className="relative aspect-square max-w-md mx-auto">
              <Image
                src="/placeholder.svg?height=600&width=600&text=Register+Illustration"
                alt="Register Illustration"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="mb-8 lg:hidden">
            <Link
              href="/"
              className="flex items-center gap-2 text-2xl font-bold"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground">
                <User className="w-5 h-5" />
              </div>
              BlogFolio
            </Link>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">Create Account</h2>
            <p className="text-muted-foreground mt-2">
              Join our community of writers and readers
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="fullName"
                className={errors.fullName ? "text-destructive" : ""}
              >
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="fullName"
                  name="fullName"
                  value={registerForm.fullName}
                  onChange={handleInputChange}
                  className={cn(
                    "pl-10",
                    errors.fullName ? "border-destructive" : ""
                  )}
                  placeholder="Enter your full name"
                  disabled={isLoading || registerSuccess}
                />
              </div>
              {errors.fullName && (
                <p className="text-destructive text-sm">{errors.fullName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className={errors.email ? "text-destructive" : ""}
              >
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={registerForm.email}
                  onChange={handleInputChange}
                  className={cn(
                    "pl-10",
                    errors.email ? "border-destructive" : ""
                  )}
                  placeholder="Enter your email"
                  disabled={isLoading || registerSuccess}
                />
              </div>
              {errors.email && (
                <p className="text-destructive text-sm">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="username"
                className={errors.username ? "text-destructive" : ""}
              >
                Username
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  name="username"
                  value={registerForm.username}
                  onChange={handleInputChange}
                  className={cn(
                    "pl-10",
                    errors.username ? "border-destructive" : ""
                  )}
                  placeholder="Choose a username"
                  disabled={isLoading || registerSuccess}
                />
              </div>
              {errors.username && (
                <p className="text-destructive text-sm">{errors.username}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className={errors.password ? "text-destructive" : ""}
              >
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={registerForm.password}
                  onChange={handleInputChange}
                  className={cn(
                    "pl-10",
                    errors.password ? "border-destructive" : ""
                  )}
                  placeholder="Create a password"
                  disabled={isLoading || registerSuccess}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading || registerSuccess}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-destructive text-sm">{errors.password}</p>
              )}

              {/* Password Strength Meter */}
              {registerForm.password && (
                <div className="mt-2 space-y-2">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Password strength</span>
                      <span>
                        {passwordStrength < 40
                          ? "Weak"
                          : passwordStrength < 80
                          ? "Medium"
                          : "Strong"}
                      </span>
                    </div>
                    <Progress
                      value={passwordStrength}
                      className={cn(
                        passwordStrength < 40
                          ? "text-destructive"
                          : passwordStrength < 80
                          ? "text-amber-500"
                          : "text-green-500"
                      )}
                    />
                  </div>
                  <ul className="space-y-1 text-xs">
                    <li
                      className={cn(
                        "flex items-center gap-1",
                        passwordRequirements.length
                          ? "text-green-500"
                          : "text-muted-foreground"
                      )}
                    >
                      {passwordRequirements.length ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <X className="h-3 w-3" />
                      )}
                      At least 8 characters
                    </li>
                    <li
                      className={cn(
                        "flex items-center gap-1",
                        passwordRequirements.uppercase
                          ? "text-green-500"
                          : "text-muted-foreground"
                      )}
                    >
                      {passwordRequirements.uppercase ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <X className="h-3 w-3" />
                      )}
                      One uppercase letter
                    </li>
                    <li
                      className={cn(
                        "flex items-center gap-1",
                        passwordRequirements.lowercase
                          ? "text-green-500"
                          : "text-muted-foreground"
                      )}
                    >
                      {passwordRequirements.lowercase ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <X className="h-3 w-3" />
                      )}
                      One lowercase letter
                    </li>
                    <li
                      className={cn(
                        "flex items-center gap-1",
                        passwordRequirements.number
                          ? "text-green-500"
                          : "text-muted-foreground"
                      )}
                    >
                      {passwordRequirements.number ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <X className="h-3 w-3" />
                      )}
                      One number
                    </li>
                    <li
                      className={cn(
                        "flex items-center gap-1",
                        passwordRequirements.special
                          ? "text-green-500"
                          : "text-muted-foreground"
                      )}
                    >
                      {passwordRequirements.special ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <X className="h-3 w-3" />
                      )}
                      One special character
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="confirmPassword"
                className={errors.confirmPassword ? "text-destructive" : ""}
              >
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={registerForm.confirmPassword}
                  onChange={handleInputChange}
                  className={cn(
                    "pl-10",
                    errors.confirmPassword ? "border-destructive" : ""
                  )}
                  placeholder="Confirm your password"
                  disabled={isLoading || registerSuccess}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading || registerSuccess}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-destructive text-sm">
                  {errors.confirmPassword}
                </p>
              )}
              {registerForm.confirmPassword &&
                registerForm.password === registerForm.confirmPassword &&
                !errors.confirmPassword && (
                  <p className="text-green-500 text-sm flex items-center gap-1">
                    <Check className="h-3 w-3" /> Passwords match
                  </p>
                )}
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="termsAccepted"
                  checked={registerForm.termsAccepted}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(checked as boolean, "termsAccepted")
                  }
                  disabled={isLoading || registerSuccess}
                  className={errors.termsAccepted ? "border-destructive" : ""}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="termsAccepted"
                    className={cn(
                      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                      errors.termsAccepted ? "text-destructive" : ""
                    )}
                  >
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-primary hover:underline"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-primary hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </label>
                  {errors.termsAccepted && (
                    <p className="text-destructive text-xs">
                      {errors.termsAccepted}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {registerError && (
              <div className="p-3 rounded-md bg-destructive/10 text-destructive border border-destructive/20 flex items-center gap-2 text-sm">
                <AlertCircle className="h-4 w-4" />
                {registerError}
              </div>
            )}

            {registerSuccess && (
              <div className="p-3 rounded-md bg-green-500/10 text-green-500 border border-green-500/20 flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4" />
                Registration successful! Redirecting to verification page...
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || registerSuccess}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-primary hover:underline">
              Sign In
            </Link>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
