import { useForm } from "react-hook-form";
import Logo from "../../ui/Logo";
import Button from "../../ui/Button";
import { useLogin } from "../../hooks/useLogin";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogiWithGoogle } from "../../hooks/useLoginWithGoogle";
import { FaGoogle } from "react-icons/fa";

export default function Login() {
  const { login, isLogging, error } = useLogin();
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
    setSuccess(""); // Reset success state
    login(
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
    <div className="w-[21rem] sm:w-[34rem] z-50 bg-white dark:bg-black3 rounded-md fixed top-20 sm:top-28 left-1/2 -translate-x-1/2 p-6 sm:p-8 flex flex-col items-center justify-center sm:grid sm:grid-cols-[1fr_2fr] gap-4 sm:gap-12 drop-shadow-xl">
      {/* Logo Section */}
      <div className="flex items-center justify-center ">
        <Logo />
      </div>
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
            disabled={isLogging || isLoginWithGoogle}
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
          <input
            className="w-full h-[2.5rem] rounded-md border bg-transparent border-gray2 px-4 py-2 text-[0.8125rem] font-medium dark:text-white outline-none"
            placeholder="Enter your Email"
            aria-invalid={!!errors.email}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email",
              },
            })}
          />
          {errors.email && (
            <p className="text-red1 px-2 text-start w-full text-sm">
              {errors.email.message}
            </p>
          )}

          <input
            className="w-full h-[2.5rem] rounded-md border bg-transparent border-gray2 px-4 py-2 text-[0.8125rem] font-medium dark:text-white outline-none"
            placeholder="Enter your Password"
            type="password"
            aria-invalid={!!errors.password}
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
          />
          {errors.password && (
            <p className="text-red1 px-2 text-start w-full text-sm">
              {errors.password.message}
            </p>
          )}

          <Button
            type="submit"
            disabled={isLogging || isLoginWithGoogle}
            className="w-full"
          >
            {isLogging ? <LoadingSpinner /> : "Login"}
          </Button>
          {(error || googleError) && (
            <p className="text-red1 px-2 text-start w-full text-sm">
              {error?.message || googleError?.message}
            </p>
          )}
          {success && (
            <p className="text-green-500 px-2 text-center w-full text-sm">
              {success}
            </p>
          )}

          <p className="w-full h-[1px] bg-gray1 opacity-75 my-4"></p>
          <p className="text-gray1 font-medium text-sm gap-1 flex items-center justify-center ">
            {`Don't have an account?`}
            <Button
              shape="textOnlyP"
              onClick={() => navigate("/signup")}
              className="font-medium text-sm"
            >
              Sign up
            </Button>
          </p>
        </form>
      </div>
    </div>
  );
}
