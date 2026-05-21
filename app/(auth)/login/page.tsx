"use client";

import { FormField } from "@/components/ui/FormField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from './../../../lib/validations/auth';
import { useLogin } from "@/hooks/useAuth";
import type { AxiosError } from "axios";

export default function LoginPage() {
 const {mutate:login,isPending,error} = useLogin();
 const {
    register,
    handleSubmit,
    formState:{errors},
 } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode:'onTouched' // validates when user leaves a field
 })
  const onSubmit = async (data: LoginFormData) => {
    login(data)
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-surface">
      <div className="card  w-full  max-w-sm">
        {/*Headers */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-4 bg-primary">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight  text-primary">
            Shop Ease
          </h1>
          <p className="mt-1 text-sm text-gray-500">Sign in to your account</p>
        </div>

        {/*Badge */}
        {error && (
          <div className="badge badge-danger w-full justify-center mb-4 py-2 ">
            {(error as AxiosError<{message: string}>)?.response?.data?.message || "Login Failed"}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email input */}
          <FormField id="email" label="Email" error={errors.email?.message}>
           
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="input"
              autoComplete="email"
              {...register("email")}
            />
          </FormField>

          {/* Password Input */}
          <FormField id="password" label="Password" error={errors.password?.message}>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="input"
              autoComplete="current-password"
              {...register("password")}
            />
          </FormField>
          {/* Forgot-password */}
            <div className="flex justify-end mt-2">
              <a
                href="/login/forgot-password"
                className="text-sm font-medium text-accent hover:text-accent-hover transition-colors"
              >
                Forgot Password?
              </a>
            </div>
          {/* Sign In button */}
          <button
            type="submit"
            disabled={isPending}
            className="btn-primary w-full mt-2"
          >
            {isPending ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px" />
          <span>or</span>
          <div className="flex-1 h-px" />
        </div>

        {/* Google Button */}
        <button className="btn-outline w-full justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </button>

        {/* Footer */}
        <p className="mt-4 text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <a
            href="/register"
            className="font-medium text-accent hover:text-accent-hover transition-colors"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
