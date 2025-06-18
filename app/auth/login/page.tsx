"use client";

import type React from "react";

import { useState } from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("user");
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // User login form state
  const [userForm, setUserForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  // Admin login form state
  const [adminForm, setAdminForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  // Form validation state
  const [errors, setErrors] = useState({
    user: {
      email: "",
      password: "",
    },
    admin: {
      email: "",
      password: "",
    },
  });

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setLoginError(null);
  };

  // Handle user form input change
  const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserForm({ ...userForm, [name]: value });

    // Clear error when user types
    setErrors({
      ...errors,
      user: {
        ...errors.user,
        [name]: "",
      },
    });
    setLoginError(null);
  };

  // Handle admin form input change
  const handleAdminInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdminForm({ ...adminForm, [name]: value });

    // Clear error when user types
    setErrors({
      ...errors,
      admin: {
        ...errors.admin,
        [name]: "",
      },
    });
    setLoginError(null);
  };

  // Handle checkbox change
  const handleCheckboxChange = (
    checked: boolean,
    formType: "user" | "admin"
  ) => {
    if (formType === "user") {
      setUserForm({ ...userForm, rememberMe: checked });
    } else {
      setAdminForm({ ...adminForm, rememberMe: checked });
    }
  };

  // Validate user form
  const validateUserForm = () => {
    let valid = true;
    const newErrors = { ...errors.user };

    if (!userForm.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(userForm.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    if (!userForm.password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors({ ...errors, user: newErrors });
    return valid;
  };

  // Validate admin form
  const validateAdminForm = () => {
    let valid = true;
    const newErrors = { ...errors.admin };

    if (!adminForm.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(adminForm.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    if (!adminForm.password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors({ ...errors, admin: newErrors });
    return valid;
  };

  // Handle user login
  const handleUserLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateUserForm()) {
      setIsLoading(true);
      setLoginError(null);

      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userForm.email,
            password: userForm.password,
          }),
        });
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Login failed");
        }

        setLoginSuccess(true);

        //* Redirect after success
        setTimeout(() => {
          router.push("/profile");
        }, 1500);
      } catch (error) {
        console.log("Login error:", error);
        setLoginError(error instanceof Error ? error.message : "Login failed");
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Handle admin login
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateAdminForm()) {
      setIsLoading(true);
      setLoginError(null);

      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: adminForm.email,
            password: adminForm.password,
          }),
        });
        if (!response.ok) {
          const data = await response.json();

          throw new Error(data.error || "Login failed");
        }

        const data = await response.json();
        if (data.user.role) {
          localStorage.setItem("role", data.user.role);
        }

        setLoginSuccess(true);

        // Redirect after success
        setTimeout(() => {
          router.push("/admin/dashboard");
        }, 1500);
      } catch (error) {
        setLoginError(error instanceof Error ? error.message : "Login failed");
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
            <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
            <p className="text-muted-foreground mb-8">
              Sign in to access your account and continue your journey with
              BlogFolio. Discover insightful stories and share your knowledge
              with the world.
            </p>
            <div className="relative aspect-square max-w-md mx-auto">
              <Image
                src="/placeholder.svg?height=600&width=600&text=Login+Illustration"
                alt="Login Illustration"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
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
            <h2 className="text-3xl font-bold">Sign In</h2>
            <p className="text-muted-foreground mt-2">
              Access your account to continue
            </p>
          </div>

          <Tabs
            defaultValue="user"
            className="w-full"
            onValueChange={handleTabChange}
          >
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="user">User Login</TabsTrigger>
              <TabsTrigger value="admin">Admin Login</TabsTrigger>
            </TabsList>

            {/* User Login Tab */}
            <TabsContent value="user" className="mt-0 space-y-6">
              <form onSubmit={handleUserLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="user-email"
                    className={errors.user.email ? "text-destructive" : ""}
                  >
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="user-email"
                      name="email"
                      type="email"
                      value={userForm.email}
                      onChange={handleUserInputChange}
                      className={cn(
                        "pl-10",
                        errors.user.email ? "border-destructive" : ""
                      )}
                      placeholder="Enter your email"
                      disabled={isLoading || loginSuccess}
                    />
                  </div>
                  {errors.user.email && (
                    <p className="text-destructive text-sm">
                      {errors.user.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label
                      htmlFor="user-password"
                      className={errors.user.password ? "text-destructive" : ""}
                    >
                      Password
                    </Label>
                    <Link
                      href="/auth/forgot-password"
                      className="text-sm text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="user-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={userForm.password}
                      onChange={handleUserInputChange}
                      className={cn(
                        "pl-10",
                        errors.user.password ? "border-destructive" : ""
                      )}
                      placeholder="Enter your password"
                      disabled={isLoading || loginSuccess}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading || loginSuccess}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {errors.user.password && (
                    <p className="text-destructive text-sm">
                      {errors.user.password}
                    </p>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="user-remember"
                    checked={userForm.rememberMe}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(checked as boolean, "user")
                    }
                    disabled={isLoading || loginSuccess}
                  />
                  <label
                    htmlFor="user-remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </label>
                </div>

                {loginError && (
                  <div className="p-3 rounded-md bg-destructive/10 text-destructive border border-destructive/20 flex items-center gap-2 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    {loginError}
                  </div>
                )}

                {loginSuccess && (
                  <div className="p-3 rounded-md bg-green-500/10 text-green-500 border border-green-500/20 flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4" />
                    Login successful! Redirecting...
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading || loginSuccess}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <Button
                  variant="outline"
                  className="w-full"
                  disabled={isLoading || loginSuccess}
                >
                  <Image
                    src="/placeholder.svg?height=20&width=20&text=G"
                    alt="Google"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  Google
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  disabled={isLoading || loginSuccess}
                >
                  <Image
                    src="/placeholder.svg?height=20&width=20&text=F"
                    alt="Facebook"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  Facebook
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  disabled={isLoading || loginSuccess}
                >
                  <Image
                    src="/placeholder.svg?height=20&width=20&text=T"
                    alt="Twitter"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  Twitter
                </Button>
              </div>

              <div className="text-center text-sm">
                Don't have an account?{" "}
                <Link
                  href="/auth/register"
                  className="text-primary hover:underline"
                >
                  Register Now
                </Link>
              </div>
            </TabsContent>

            {/* Admin Login Tab */}
            <TabsContent value="admin" className="mt-0 space-y-6">
              <div className="p-3 rounded-md bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center gap-2 text-sm">
                <AlertCircle className="h-4 w-4" />
                Admin credentials required. Only authorized personnel can access
                this area.
              </div>

              <form onSubmit={handleAdminLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="admin-email"
                    className={errors.admin.email ? "text-destructive" : ""}
                  >
                    Admin Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="admin-email"
                      name="email"
                      type="email"
                      value={adminForm.email}
                      onChange={handleAdminInputChange}
                      className={cn(
                        "pl-10",
                        errors.admin.email ? "border-destructive" : ""
                      )}
                      placeholder="Enter admin email"
                      disabled={isLoading || loginSuccess}
                    />
                  </div>
                  {errors.admin.email && (
                    <p className="text-destructive text-sm">
                      {errors.admin.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label
                      htmlFor="admin-password"
                      className={
                        errors.admin.password ? "text-destructive" : ""
                      }
                    >
                      Password
                    </Label>
                    <Link
                      href="/auth/forgot-password"
                      className="text-sm text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="admin-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={adminForm.password}
                      onChange={handleAdminInputChange}
                      className={cn(
                        "pl-10",
                        errors.admin.password ? "border-destructive" : ""
                      )}
                      placeholder="Enter admin password"
                      disabled={isLoading || loginSuccess}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading || loginSuccess}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {errors.admin.password && (
                    <p className="text-destructive text-sm">
                      {errors.admin.password}
                    </p>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="admin-remember"
                    checked={adminForm.rememberMe}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(checked as boolean, "admin")
                    }
                    disabled={isLoading || loginSuccess}
                  />
                  <label
                    htmlFor="admin-remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </label>
                </div>

                {loginError && (
                  <div className="p-3 rounded-md bg-destructive/10 text-destructive border border-destructive/20 flex items-center gap-2 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    {loginError}
                  </div>
                )}

                {loginSuccess && (
                  <div className="p-3 rounded-md bg-green-500/10 text-green-500 border border-green-500/20 flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4" />
                    Admin login successful! Redirecting...
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading || loginSuccess}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Admin Sign In"
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

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
