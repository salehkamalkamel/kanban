import { useForm } from "react-hook-form";
import Logo from "../../ui/Logo";
import Button from "../../ui/Button";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { useState } from "react";
import { useSignUp } from "../../hooks/useSignUp";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useLogiWithGoogle } from "../../hooks/useLoginWithGoogle";

export default function SignUp() {
  const { signUp, isSigningUp, error } = useSignUp();
  const {
    loginWithGoogle,
    isLoginWithGoogle,
    error: googleError,
  } = useLogiWithGoogle();
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    signUp(
      { email: data.email, password: data.password },
      {
        onSuccess: (data) => {
          setSuccess(data.message);
          navigate("/");
        },
      }
    );
  }

  return (
    <div className="w-[21rem] sm:w-[34rem] z-50 bg-white rounded-md fixed top-20 sm:top-28 left-1/2 -translate-x-1/2 p-6 sm:p-8 flex flex-col items-center justify-center sm:grid sm:grid-cols-[1fr_2fr] gap-4 sm:gap-12 drop-shadow-xl text-black1">
      {/* Logo Section */}
      <div className="flex items-center justify-center">
        <Logo />
      </div>

      {/* Login Form Section */}
      <div className="flex flex-col items-center justify-center gap-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center gap-4 w-full"
        >
          <Button
            onClick={() =>
              loginWithGoogle(
                {},
                {
                  onSuccess: (data) => {
                    setSuccess(data.message);
                    navigate("/");
                  },
                }
              )
            }
            disabled={isSigningUp || isLoginWithGoogle}
            shape="secondary"
            className="flex items-center gap-4 w-full justify-center"
          >
            {!isLoginWithGoogle && <FaGoogle />}
            {isLoginWithGoogle ? <LoadingSpinner /> : "Continue with Google"}
          </Button>

          <p className="w-full uppercase font-medium text-sm text-black1 flex items-center justify-center">
            <span className="line"></span>
            <span className="px-4">Or</span>
            <span className="line"></span>
          </p>
          {/* Email Input */}
          <input
            className="w-full h-[2.5rem] rounded-md border bg-transparent border-gray2 px-4 py-2 text-[0.8125rem] font-medium dark:text-white outline-none"
            placeholder="Enter your Email"
            aria-invalid={!!errors.email}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red1 px-2 text-start w-full text-sm">
              {errors.email.message}
            </p>
          )}

          {/* Password Input */}
          <input
            className="w-full h-[2.5rem] rounded-md border bg-transparent border-gray2 px-4 py-2 text-[0.8125rem] font-medium dark:text-white outline-none"
            placeholder="Enter your Password"
            type="password"
            aria-invalid={!!errors.password}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red1 px-2 w-full text-start text-sm">
              {errors.password.message}
            </p>
          )}

          {/* Submit Button */}
          <Button type="submit" disabled={isSigningUp} className="w-full">
            {isSigningUp ? <LoadingSpinner /> : "Sign up"}
          </Button>

          {error ||
            (googleError && (
              <p className="text-red1 px-2 text-center w-full text-sm">
                {error.message}
              </p>
            ))}
          {success && (
            <p className="text-green-500 px-2 text-center w-full text-sm">
              {success}
            </p>
          )}
          <p className="w-full h-[1px] bg-gray1 opacity-75 my-4"></p>

          <p className="text-gray1 font-medium text-sm gap-1 flex items-center justify-center ">
            Already have an account?
            <Button
              shape="textOnlyP"
              onClick={() => navigate("/login")}
              className="font-medium text-sm"
            >
              Login
            </Button>
          </p>
        </form>
      </div>
    </div>
  );
}
