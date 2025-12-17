import { NavLink, Outlet, useLocation, useNavigate } from "react-router";
import {
  FaHome,
  FaClipboardList,
  FaUsers,
  FaMoneyBill,
  FaSignOutAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";
import Logo from "../components/Logo";

const DashboardLayout = () => {
  const { role, isLoading } = useRole();
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const handleLogout = async () => {
    await logOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-base-100">
      <aside className="w-64 bg-base-200 p-6 flex flex-col">
        <Logo />

        <ul className="menu mt-10 flex-1 space-y-1">
          <AnimatedItem to="/dashboard" end icon={<FaHome />}>
            Dashboard
          </AnimatedItem>

          {role === "user" && <UserMenu />}
          {role === "admin" && <AdminMenu />}
          {role === "decorator" && <DecoratorMenu />}
        </ul>

        <button
          onClick={handleLogout}
          className="btn btn-outline btn-error w-full mt-4"
        >
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b px-6 flex items-center justify-between">
          <h2 className="font-semibold text-lg">Dashboard</h2>

          <div className="flex items-center gap-3">
            <img
              src={user?.photoURL}
              alt="user"
              className="w-9 h-9 rounded-full object-cover"
            />
            <span className="font-medium">{user?.displayName}</span>
          </div>
        </header>

        <main className="p-8 flex-1 overflow-hidden">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="h-full"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;


const AnimatedItem = ({ to, children, icon, end }) => (
  <motion.li
    whileHover={{ x: 6 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        isActive
          ? "bg-primary text-white rounded-lg px-3 py-2 flex items-center gap-2"
          : "px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-base-300"
      }
    >
      {icon}
      {children}
    </NavLink>
  </motion.li>
);

const UserMenu = () => (
  <>
    <AnimatedItem to="my-bookings" icon={<FaClipboardList />}>
      My Bookings
    </AnimatedItem>
    <AnimatedItem to="payments" icon={<FaMoneyBill />}>
      Payments
    </AnimatedItem>
  </>
);

const AdminMenu = () => (
  <>
    <AnimatedItem to="manage-services" icon={<FaClipboardList />}>
      Manage Services
    </AnimatedItem>
    <AnimatedItem to="manage-users" icon={<FaUsers />}>
      Manage Users
    </AnimatedItem>
  </>
);

const DecoratorMenu = () => (
  <>
    <AnimatedItem to="assigned-jobs" icon={<FaClipboardList />}>
      Assigned Jobs
    </AnimatedItem>
  </>
);
