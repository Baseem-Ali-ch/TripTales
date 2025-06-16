"use client";

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Mail,
  User,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(
    null
  );

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      verifyEmail(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const verifyEmail = async (token: string) => {
    setIsVerifying(true);
    try {
      const VerificationToken = localStorage.getItem("verificationToken");
      const email = localStorage.getItem("email");

      const response = await fetch(`/api/auth/verify-email?token=${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          VerificationToken,
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      //* Clear the verification token from local storage
      localStorage.removeItem("verificationToken");
      localStorage.removeItem("email");

      //* If successful, the API will redirect to the success page
      router.push("/auth/verify-email/success");
    } catch (error: any) {
      console.error("Verification error:", error);
      setVerificationError(error.message);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendEmail = async () => {
    setIsResending(true);
    try {
      // Add resend email logic here
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated delay
      setResendSuccess(true);
    } catch (error) {
      console.error("Error resending verification email:", error);
    } finally {
      setIsResending(false);
    }
  };

  // If there's a token, show verification status
  if (searchParams.get("token")) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <div className="w-full max-w-md text-center">
          {isVerifying ? (
            <div className="space-y-4">
              <Loader2 className="h-8 w-8 animate-spin mx-auto" />
              <h2 className="text-2xl font-bold">Verifying your email...</h2>
              <p className="text-muted-foreground">
                Please wait while we verify your email address.
              </p>
            </div>
          ) : verificationError ? (
            <div className="space-y-4">
              <div className="p-6 rounded-md bg-destructive/10 text-destructive border border-destructive/20 flex flex-col items-center gap-4">
                <AlertCircle className="h-8 w-8" />
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    Verification Failed
                  </h2>
                  <p className="text-muted-foreground">{verificationError}</p>
                </div>
              </div>
              <Link
                href="/auth/login"
                className="text-primary hover:underline inline-flex items-center"
              >
                Return to login
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  // If no token, show the initial verification message
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
                TripTales
              </Link>
            </div>
            <h1 className="text-4xl font-bold mb-4">Verify Your Email</h1>
            <p className="text-muted-foreground mb-8">
              We've sent you a verification email. Please check your inbox and
              follow the instructions to verify your account.
            </p>
            <div className="relative aspect-square max-w-md mx-auto">
              <Image
                src="/placeholder.svg?height=600&width=600&text=Email+Verification"
                alt="Email Verification Illustration"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Verification Message */}
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
              TripTales
            </Link>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">Check Your Email</h2>
            <p className="text-muted-foreground mt-2">
              We've sent you a verification link
            </p>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-md bg-green-500/10 text-green-500 border border-green-500/20 flex flex-col items-center gap-4 text-center">
              <div className="h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center">
                <Mail className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Verification Email Sent
                </h3>
                <p className="text-muted-foreground">
                  Please check your email inbox and click the verification link
                  to activate your account.
                </p>
              </div>
            </div>

            <div className="text-center text-sm space-y-4">
              <p className="text-muted-foreground">
                Didn't receive the email? Check your spam folder or{" "}
                <button
                  type="button"
                  className="text-primary hover:underline"
                  onClick={handleResendEmail}
                  disabled={isResending || resendSuccess}
                >
                  {isResending ? (
                    <>
                      <Loader2 className="inline h-3 w-3 animate-spin mr-1" />
                      Resending...
                    </>
                  ) : resendSuccess ? (
                    "Email resent!"
                  ) : (
                    "resend verification email"
                  )}
                </button>
              </p>

              <Link
                href="/auth/login"
                className="text-primary hover:underline inline-flex items-center"
              >
                Return to login
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
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

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Loading...</h2>
            <p className="text-muted-foreground">
              Please wait while we load the verification page.
            </p>
          </div>
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
