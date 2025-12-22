import { Link, useRouteError } from "react-router";
import { motion } from "framer-motion";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";

const ErrorPage = () => {
  const error = useRouteError();

  const status = error?.status || 404;
  const message =
    error?.statusText ||
    error?.message ||
    "The page you are looking for does not exist.";

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-lg w-full bg-base-100 rounded-3xl shadow-xl p-10 text-center"
      >
        <motion.div
          initial={{ rotate: -10 }}
          animate={{ rotate: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="mx-auto mb-6 w-20 h-20 rounded-full bg-error/10 flex items-center justify-center text-error text-3xl"
        >
          <FaExclamationTriangle />
        </motion.div>

        <h1 className="text-6xl font-extrabold text-error mb-2">
          {status}
        </h1>

        <h2 className="text-2xl font-semibold mb-3">
          Oops! Something went wrong
        </h2>

        <p className="text-base-content/70 mb-8">
          {message}
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/"
            className="btn btn-primary rounded-full px-6 flex items-center gap-2"
          >
            <FaHome />
            Go Home
          </Link>

          <button
            onClick={() => window.location.reload()}
            className="btn btn-outline rounded-full px-6"
          >
            Reload
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
