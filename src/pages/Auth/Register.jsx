import { useForm } from "react-hook-form";
import { useState } from "react";
import { FiEye, FiEyeOff, FiInfo } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "./SocialLogin";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const passwordRules =  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { registerUser, updateUserInfo } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const handleRegistration = async (data) => {
    const imageFile = data.photo[0];

    const formData = new FormData();
    formData.append("image", imageFile);

    const imgRes = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbbKey}`,
      formData
    );

    const photoURL = imgRes.data.data.url;

    await registerUser(data.email, data.password);
    await updateUserInfo({ displayName: data.name, photoURL });

    await axiosSecure.post("/users", {
      name: data.name,
      email: data.email,
      photoURL,
    });

    navigate(location?.state || "/");
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-8">
        Create your account
      </h2>

      <form onSubmit={handleSubmit(handleRegistration)} className="space-y-5">

        <input
          className="input input-bordered w-full rounded-2xl"
          placeholder="Full name"
          {...register("name", { required: true })}
        />
        {errors.name && (
          <p className="text-error text-sm">Name is required</p>
        )}

        <input
          type="file"
          className="file-input file-input-bordered w-full rounded-2xl"
          {...register("photo", { required: true })}
        />
        {errors.photo && (
          <p className="text-error text-sm">Profile photo is required</p>
        )}

        <input
          className="input input-bordered w-full rounded-2xl"
          placeholder="Email address"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <p className="text-error text-sm">Email is required</p>
        )}

        {/* Password with tooltip */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="input input-bordered w-full rounded-2xl pr-20"
            {...register("password", {
              required: true,
              pattern: passwordRules,
            })}
          />

          {/* Info Tooltip */}
          <div className="absolute right-12 top-1/2 -translate-y-1/2 group cursor-pointer">
            <FiInfo className="text-base-content/60" />
            <div className="absolute right-0 top-8 w-64 rounded-xl bg-base-100 p-4 text-sm shadow-lg opacity-0 group-hover:opacity-100 transition pointer-events-none">
              <p className="font-semibold mb-1">Password must include:</p>
              <ul className="list-disc pl-4 space-y-1 text-base-content/70">
                <li>Minimum 6 characters</li>
                <li>1 uppercase letter</li>
                <li>1 lowercase letter</li>
                <li>1 number</li>
                <li>1 special character</li>
              </ul>
            </div>
          </div>

          {/* Eye */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/60 hover:text-primary"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>

          {errors.password && (
            <p className="text-error text-sm mt-1">
              Password does not meet requirements
            </p>
          )}
        </div>

        <button className="btn btn-primary w-full rounded-2xl">
          Register
        </button>
      </form>

      <SocialLogin />

      <p className="text-center mt-6 text-sm text-base-content/70">
        Already have an account?{" "}
        <Link to="/login" state={location.state} className="link link-primary">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
