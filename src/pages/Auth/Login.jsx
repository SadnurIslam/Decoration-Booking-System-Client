import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "./SocialLogin";
import LoadingSpinner from "../../components/LoadingSpinner";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signInUser} = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);


  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then(() => navigate(location?.state || "/"))
      .catch(err => console.log(err.message));
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-8">Welcome back</h2>

      <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">

        {/* Email */}
        <div>
          <input
            type="email"
            placeholder="Email address"
            className="input input-bordered w-full rounded-2xl"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p className="text-error text-sm mt-1">Email is required</p>
          )}
        </div>

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="input input-bordered w-full rounded-2xl pr-12"
            {...register("password", { required: true, minLength: 6 })}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/60 hover:text-primary"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>

          {errors.password && (
            <p className="text-error text-sm mt-1">
              Password must be at least 6 characters
            </p>
          )}
        </div>

        <button className="btn btn-primary w-full rounded-2xl">
          Login
        </button>
      </form>

      <SocialLogin />

      <p className="text-center mt-6 text-sm text-base-content/70">
        New here?{" "}
        <Link to="/register" state={location.state} className="link link-primary">
          Create an account
        </Link>
      </p>
    </div>
  );
};

export default Login;
