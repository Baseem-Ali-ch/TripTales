"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Mail, User, Loader2, AlertCircle, CheckCircle2, ChevronLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")

  // Handle email input change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setEmailError("")
    setError(null)
  }

  // Validate form
  const validateForm = () => {
    let valid = true

    if (!email.trim()) {
      setEmailError("Email is required")
      valid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email is invalid")
      valid = false
    }

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
        // For demo purposes, show error for non-existent email
        if (email === "nonexistent@example.com") {
          setError("No account found with this email address")
          setIsLoading(false)
          return
        }

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
            <h1 className="text-4xl font-bold mb-4">Forgot Your Password?</h1>
            <p className="text-muted-foreground mb-8">
              Don't worry, it happens to the best of us. Enter your email address and we'll send you instructions to
              reset your password.
            </p>
            <div className="relative aspect-square max-w-md mx-auto">
              <Image
                src="/placeholder.svg?height=600&width=600&text=Forgot+Password+Illustration"
                alt="Forgot Password Illustration"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Forgot Password Form */}
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
            <p className="text-muted-foreground mt-2">Enter your email to receive reset instructions</p>
          </div>

          {!success ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className={emailError ? "text-destructive" : ""}>
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    className={cn("pl-10", emailError ? "border-destructive" : "")}
                    placeholder="Enter your email address"
                    disabled={isLoading}
                  />
                </div>
                {emailError && <p className="text-destructive text-sm">{emailError}</p>}
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
                    Sending...
                  </>
                ) : (
                  "Send Reset Instructions"
                )}
              </Button>

              <div className="text-center text-sm">
                <Link href="/auth/login" className="text-primary hover:underline">
                  Back to login
                </Link>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="p-6 rounded-md bg-green-500/10 text-green-500 border border-green-500/20 flex flex-col items-center gap-4 text-center">
                <div className="h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Check Your Email</h3>
                  <p className="text-muted-foreground">We've sent password reset instructions to:</p>
                  <p className="font-medium mt-1">{email}</p>
                </div>
              </div>

              <div className="text-center text-sm space-y-4">
                <p className="text-muted-foreground">
                  Didn't receive the email? Check your spam folder or{" "}
                  <button
                    type="button"
                    className="text-primary hover:underline"
                    onClick={() => {
                      setIsLoading(true)
                      setTimeout(() => {
                        setIsLoading(false)
                      }, 1000)
                    }}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="inline h-3 w-3 animate-spin mr-1" />
                        Resending...
                      </>
                    ) : (
                      "try again"
                    )}
                  </button>
                </p>

                <Link href="/auth/login" className="text-primary hover:underline inline-flex items-center">
                  Return to login
                  <ArrowRight className="ml-1 h-3 w-3" />
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
