"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../store";
import { signup as signupAction, login as loginAction, signInWithGoogle as signInWithGoogleAction } from "../../store/slices/authSlice";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Eye, EyeOff, UserPlus, School } from "lucide-react";
import { z } from "zod";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoadingSpinner } from "@/components/loading-spinner";

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  role: z.enum(["student", "teacher", "admin"])
});

type SignupForm = z.infer<typeof signupSchema>;


export default function SignupPage() {
  const dispatch = useAppDispatch();
  const { user, loading, error } = useAppSelector(state => state.auth);
  const router = useRouter();
  const [form, setForm] = useState<SignupForm>({ 
    name: "", 
    email: "", 
    password: "",
    role: "student" 
  });
  const [showPassword, setShowPassword] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  
  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
      setSignupLoading(false);
      setGoogleLoading(false);
    }
  }, [error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (value: string) => {
    setForm({ ...form, role: value as "student" | "teacher" | "admin" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupLoading(true);

    try {
      const validatedData = signupSchema.parse(form);
      await dispatch(signupAction({
        email: validatedData.email,
        password: validatedData.password,
        name: validatedData.name,
        role: validatedData.role
      })).unwrap();
      
      await dispatch(loginAction({
        email: validatedData.email,
        password: validatedData.password
      })).unwrap();
      
      toast.success("Account created successfully! Welcome aboard!");
      
    } catch (err: unknown) {
      if (err instanceof z.ZodError) {
        err.issues.forEach((error: z.ZodIssue) => {
          toast.error(error.message);
        });
      } else if (err instanceof Error) {
        toast.error(err.message || "An error occurred during signup");
      } else {
        toast.error("An error occurred during signup");
      }
    } finally {
      setSignupLoading(false);
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    try {
      await dispatch(signInWithGoogleAction()).unwrap();
      toast.success("Successfully signed in with Google!");
      
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message || "Failed to sign in with Google");
      } else {
        toast.error("Failed to sign in with Google");
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (!loading && user) {
    return null; // Will redirect in useEffect
  }
  
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F9F5FF] to-[#EDE7FF] flex items-center justify-center p-4">
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="w-full max-w-md">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#842DF0] rounded-2xl mb-4">
              <School className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h1>
            <p className="text-gray-600">Join our learning platform</p>
          </div>

          {/* Signup Form */}
          <Card className="bg-white shadow-lg border-0">
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                    className="h-11 bg-gray-50 border-gray-200 focus:bg-white focus:border-[#842DF0] transition-colors"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    className="h-11 bg-gray-50 border-gray-200 focus:bg-white focus:border-[#842DF0] transition-colors"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Min. 6 chars, 1 uppercase, 1 number"
                      value={form.password}
                      onChange={handleChange}
                      required
                      autoComplete="new-password"
                      className="pr-10 h-11 bg-gray-50 border-gray-200 focus:bg-white focus:border-[#842DF0] transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Select your role</label>
                  Sign Up
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="student"
                        name="role"
                        value="student"
                        checked={form.role === "student"}
                        onChange={() => handleRoleChange("student")}
                        className="h-4 w-4 text-[#842DF0] focus:ring-[#842DF0]"
                      />
                      <label htmlFor="student" className="text-gray-700">Student</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="teacher"
                        name="role"
                        value="teacher"
                        checked={form.role === "teacher"}
                        onChange={() => handleRoleChange("teacher")}
                        className="h-4 w-4 text-[#842DF0] focus:ring-[#842DF0]"
                      />
                      <label htmlFor="teacher" className="text-gray-700">Teacher</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="admin"
                        name="role"
                        value="admin"
                        checked={form.role === "admin"}
                        onChange={() => handleRoleChange("admin")}
                        className="h-4 w-4 text-[#842DF0] focus:ring-[#842DF0]"
                      />
                      <label htmlFor="admin" className="text-gray-700">Administrator</label>
                    </div>
                  </div>
                </div>
                
                <Button
                  type="submit"
                  disabled={signupLoading || googleLoading}
                  className="w-full h-11 bg-[#842DF0] hover:bg-[#7825D9] text-white font-medium text-sm transition-colors"
                >
                  {signupLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating account...</span>
                    </div>
                  ) : (
                    'Sign Up'
                  )}
                </Button>
              </form>

              {/* Divider */}
              {/* <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div> */}

              {/* Google Sign Up */}
              {/* <Button
                type="button"
                variant="outline"
                onClick={handleGoogle}
                disabled={googleLoading || signupLoading}
                className="w-full h-11 bg-white border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </Button> */}
            </CardContent>
          </Card>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-[#842DF0] hover:text-[#7825D9] font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}