"use client";
import { useRegister } from "@/hooks/useAuth";
import { RegisterFormData, registerSchema } from "@/lib/validations/auth";
import { EyeIcon, EyeOffIcon, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { FormField } from "@/components/ui/FormField";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword,setShowConfirmPassword] = useState(false);
  const { mutate: signUp, isPending, error: signUpError } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

  const onSubmit = (data: RegisterFormData) => {
    signUp(data);
  };
  return (
   <div className="min-h-screen flex items-center justify-center px-4 bg-surface">
      <div className="card  w-full  max-w-sm">
         {/* Header */}
      <div className="mb-6 text-center">
        <div className="w-10  h-10 rounded-xl mb-4 inline-flex justify-center items-center text-white bg-primary">
          <ShoppingBag className="" />
        </div>
        <h1 className="font-semibold text-2xl tracking-tight text-primary">
          Shop Ease
        </h1>
        <p className="mt-0 text-sm text-gray-500">Register a account</p>
      </div>

      {signUpError && (
        <div className="badge badge-danger w-full justify-center mb-4 py-2">
          {(signUpError as AxiosError<{ message: string }>).response?.data
            ?.message || "Sign Up Failed"}
        </div>
      )}
      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          id="fullName"
          label="Full Name"
          error={errors.fullName?.message}
        >
          <input
            id="fullName"
            type="text"
            placeholder="Enter your full name"
            className="input"
            autoComplete="fullName"
            {...register("fullName")}
          />
        </FormField>
        {/* Username */}
         <FormField
          id="username"
          label="Username"
          error={errors.username?.message}
        >
          <input
            id="username"
            type="text"
            placeholder="Enter username"
            className="input"
            autoComplete="username"
            {...register("username")}
          />
        </FormField>


        {/* Email */}
         <FormField
          id="email"
          label="Email"
          error={errors.email?.message}
        >
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="input"
            autoComplete="email"
            {...register("email")}
          />
        </FormField>


        {/* Password */}
          <FormField
            id="password"
            label="Password"
            error={errors.password?.message}
          >
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="input"
                autoComplete="current-password"
                {...register("password")}
              />

              <button
                type="button"
                onClick={() => setShowPassword(p => !p)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute top-1.5 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                {showPassword ? (
                  <EyeOffIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>
          </FormField>

          {/* Confirm Password */}
         <FormField
            id="confirmPassword"
            label="Confirm Password"
            error={errors.confirmPassword?.message}
          >
            <div className="relative">
              <input
                id="password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Enter confirm password"
                className="input"
                autoComplete="current-password"
                {...register("confirmPassword")}
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(p => !p)}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                className="absolute top-1.5 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                {showConfirmPassword ? (
                  <EyeOffIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>
          </FormField>

          {/* Sign Up button */}
          <button
            type="submit"
            disabled={isPending}
            className="btn-primary w-full mt-2"
          >
            {isPending ? "Registering in.." : "Register"}
          </button>
      </form>
        </div>
     
    </div>
  );
}
