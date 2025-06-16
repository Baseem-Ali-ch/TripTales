"use client";

import { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Mail,
  User,
  Loader2,
  CheckCircle2,
  ChevronLeft,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [countdown, setCountdown] = useState(5);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Start countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/auth/login");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  const email = searchParams.get("email");

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
            <h1 className="text-4xl font-bold mb-4">Email Verified!</h1>
            <p className="text-muted-foreground mb-8">
              Your email {email} has been successfully verified. You can now log
              in to your account and start exploring.
            </p>
            <div className="relative aspect-square max-w-md mx-auto">
              <Image
                src="/placeholder.svg?height=600&width=600&text=Email+Verified"
                alt="Email Verified Illustration"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Success Message */}
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
            <h2 className="text-3xl font-bold">Email Verified!</h2>
            <p className="text-muted-foreground mt-2">
              Your account is now active
            </p>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-md bg-green-500/10 text-green-500 border border-green-500/20 flex flex-col items-center gap-4 text-center">
              <div className="h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Verification Successful
                </h3>
                <p className="text-muted-foreground">
                  Your email {email} has been verified successfully. You will be
                  redirected to the login page in {countdown} seconds.
                </p>
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/auth/login"
                className="text-primary hover:underline inline-flex items-center"
              >
                Go to Login Now
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

export default function VerifyEmailSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Loading...</h2>
            <p className="text-muted-foreground">
              Please wait while we verify your email.
            </p>
          </div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
