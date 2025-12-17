import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SocialLogin = () => {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();

  const handleGoogle = async () => {
    const result = await signInWithGoogle();

    await axiosSecure.post("/users", {
      email: result.user.email,
      name: result.user.displayName,
      photoURL: result.user.photoURL,
    });

    navigate(location?.state || "/");
  };

  return (
    <>
      <div className="divider my-8">OR</div>
      <button
        onClick={handleGoogle}
        className="btn btn-outline w-full rounded-2xl"
      >
        Continue with Google
      </button>
    </>
  );
};

export default SocialLogin;
