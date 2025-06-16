"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Lock, User, Loader2, AlertCircle, CheckCircle2, ChevronLeft, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

export default function ResetPasswordPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [countdown, setCountdown] = useState(5)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  })

  // Reset password form state
  const [resetForm, setResetForm] = useState({
    password: "",
    confirmPassword: "",
  })

  // Form validation state
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  })

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setResetForm({ ...resetForm, [name]: value })

    // Clear error when user types
    setErrors({
      ...errors,
      [name]: "",
    })
    setError(null)

    // Check password strength
    if (name === "password") {
      checkPasswordStrength(value)
    }
  }

  // Check password strength
  const checkPasswordStrength = (password: string) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    }

    setPasswordRequirements(requirements)

    // Calculate strength percentage
    const metRequirements = Object.values(requirements).filter(Boolean).length
    const strengthPercentage = (metRequirements / 5) * 100
    setPasswordStrength(strengthPercentage)
  }

  // Update confirm password error when password changes
  useEffect(() => {
    if (resetForm.confirmPassword && resetForm.password !== resetForm.confirmPassword) {
      setErrors({
        ...errors,
        confirmPassword: "Passwords do not match",
      })
    } else if (resetForm.confirmPassword) {
      setErrors({
        ...errors,
        confirmPassword: "",
      })
    }
  }, [resetForm.password, resetForm.confirmPassword])

  // Countdown timer for redirect
  useEffect(() => {
    if (success && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (success && countdown === 0) {
      router.push("/auth/login")
    }
  }, [success, countdown, router])

  // Validate form
  const validateForm = () => {
    let valid = true
    const newErrors = { ...errors }

    if (!resetForm.password.trim()) {
      newErrors.password = "Password is required"
      valid = false
    } else if (passwordStrength < 60) {
      newErrors.password = "Password is too weak"
      valid = false
    }

    if (!resetForm.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password"
      valid = false
    } else if (resetForm.password !== resetForm.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      setIsLoading(true)
      setError(null)

      // Simulate API call
      setTimeout(() => {
        setSuccess(true)
        setIsLoading(false)
      }, 1500)
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-muted">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-background/5 to-secondary/10" />
        <div className="relative w-full h-full flex items-center justify-center p-12">
          <div className="max-w-lg">
            <div className="mb-8">
              <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground">
                  <User className="w-5 h-5" />
                </div>
                BlogFolio
              </Link>
            </div>
            <h1 className="text-4xl font-bold mb-4">Create New Password</h1>
            <p className="text-muted-foreground mb-8">
              Your new password must be different from previously used passwords and meet our security requirements.
            </p>
            <div className="relative aspect-square max-w-md mx-auto">
              <Image
                src="/placeholder.svg?height=600&width=600&text=Reset+Password+Illustration"
                alt="Reset Password Illustration"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Reset Password Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="mb-8 lg:hidden">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground">
                <User className="w-5 h-5" />
              </div>
              BlogFolio
            </Link>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">Reset Password</h2>
            <p className="text-muted-foreground mt-2">Create a new secure password for your account</p>
          </div>

          {!success ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="password" className={errors.password ? "text-destructive" : ""}>
                  New Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={resetForm.password}
                    onChange={handleInputChange}
                    className={cn("pl-10", errors.password ? "border-destructive" : "")}
                    placeholder="Create a new password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-destructive text-sm">{errors.password}</p>}

                {/* Password Strength Meter */}
                {resetForm.password && (
                  <div className="mt-2 space-y-2">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Password strength</span>
                        <span>{passwordStrength < 40 ? "Weak" : passwordStrength < 80 ? "Medium" : "Strong"}</span>
                      </div>
                      <Progress
                        value={passwordStrength}
                        className={cn(
                          passwordStrength < 40
                            ? "text-destructive"
                            : passwordStrength < 80
                              ? "text-amber-500"
                              : "text-green-500",
                        )}
                      />
                    </div>
                    <ul className="space-y-1 text-xs">
                      <li
                        className={cn(
                          "flex items-center gap-1",
                          passwordRequirements.length ? "text-green-500" : "text-muted-foreground",
                        )}
                      >
                        {passwordRequirements.length ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                        At least 8 characters
                      </li>
                      <li
                        className={cn(
                          "flex items-center gap-1",
                          passwordRequirements.uppercase ? "text-green-500" : "text-muted-foreground",
                        )}
                      >
                        {passwordRequirements.uppercase ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                        One uppercase letter
                      </li>
                      <li
                        className={cn(
                          "flex items-center gap-1",
                          passwordRequirements.lowercase ? "text-green-500" : "text-muted-foreground",
                        )}
                      >
                        {passwordRequirements.lowercase ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                        One lowercase letter
                      </li>
                      <li
                        className={cn(
                          "flex items-center gap-1",
                          passwordRequirements.number ? "text-green-500" : "text-muted-foreground",
                        )}
                      >
                        {passwordRequirements.number ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                        One number
                      </li>
                      <li
                        className={cn(
                          "flex items-center gap-1",
                          passwordRequirements.special ? "text-green-500" : "text-muted-foreground",
                        )}
                      >
                        {passwordRequirements.special ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                        One special character
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className={errors.confirmPassword ? "text-destructive" : ""}>
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={resetForm.confirmPassword}
                    onChange={handleInputChange}
                    className={cn("pl-10", errors.confirmPassword ? "border-destructive" : "")}
                    placeholder="Confirm your new password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-destructive text-sm">{errors.confirmPassword}</p>}
                {resetForm.confirmPassword &&
                  resetForm.password === resetForm.confirmPassword &&
                  !errors.confirmPassword && (
                    <p className="text-green-500 text-sm flex items-center gap-1">
                      <Check className="h-3 w-3" /> Passwords match
                    </p>
                  )}
              </div>

              {error && (
                <div className="p-3 rounded-md bg-destructive/10 text-destructive border border-destructive/20 flex items-center gap-2 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Resetting...
                  </>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="p-6 rounded-md bg-green-500/10 text-green-500 border border-green-500/20 flex flex-col items-center gap-4 text-center">
                <div className="h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Password Reset Successful</h3>
                  <p className="text-muted-foreground">
                    Your password has been reset successfully. You will be redirected to the login page in {countdown}{" "}
                    seconds.
                  </p>
                </div>
              </div>

              <div className="text-center">
                <Link href="/auth/login" className="text-primary hover:underline">
                  Go to Login Now
                </Link>
              </div>
            </div>
          )}

          <div className="mt-8 text-center">
            <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
