import { Outlet } from "react-router";
import Logo from "../components/Logo";
import { motion } from "framer-motion";

const AuthLayout = () => {
  return (
    <main className="min-h-screen bg-base-100">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 lg:grid-cols-2">
        
        <div className="relative hidden lg:flex flex-col justify-center px-16">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10"
          >
            <Logo />

            <h1 className="mt-8 text-4xl font-bold leading-tight">
              Welcome to StyleDecor
            </h1>

            <p className="mt-4 max-w-md text-base-content/70">
              Premium decoration services for weddings, homes, and corporate
              events — managed beautifully from one platform.
            </p>
          </motion.div>
        </div>

        <div className="flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md rounded-3xl border border-base-200 bg-base-100 p-8 shadow-sm"
          >
            <Outlet />
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
