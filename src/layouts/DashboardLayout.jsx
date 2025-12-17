import { NavLink, Outlet, useLocation, useNavigate } from "react-router";
import {
    FaHome,
    FaClipboardList,
    FaUsers,
    FaMoneyBill,
    FaSignOutAlt,
    FaBars,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";
import Logo from "../components/Logo";

const DashboardLayout = () => {
    const { role, isLoading } = useRole();
    const { user, logOut } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = useState(false);

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
        <div className="min-h-screen bg-base-100 flex">

            <aside
                className={`
          fixed lg:static z-40 inset-y-0 left-0 w-72
          bg-base-200 border-r
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
            >
                <div className="h-full flex flex-col p-6">

                    <Logo />

                    <ul className="mt-10 space-y-1 flex-1">
                        <AnimatedItem to="/dashboard" end icon={<FaHome />}>
                            Dashboard
                        </AnimatedItem>

                        {role === "user" && <UserMenu />}
                        {role === "admin" && <AdminMenu />}
                        {role === "decorator" && <DecoratorMenu />}
                    </ul>

                    <button
                        onClick={handleLogout}
                        className="btn btn-outline btn-error w-full mt-6"
                    >
                        <FaSignOutAlt />
                        Logout
                    </button>
                </div>
            </aside>

            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 bg-black/40 z-30 lg:hidden"
                />
            )}

            <div className="flex-1 flex flex-col min-h-screen">

                <header className="h-16 px-6 border-b flex items-center justify-between bg-base-100 sticky top-0 z-20">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setOpen(true)}
                            className="btn btn-ghost lg:hidden"
                        >
                            <FaBars />
                        </button>
                        <h2 className="text-lg font-semibold">Dashboard</h2>
                    </div>

                    <div className="flex items-center gap-3">
                        <img
                            src={user?.photoURL}
                            alt="user"
                            className="w-9 h-9 rounded-full object-cover"
                        />
                        <span className="hidden sm:block font-medium">
                            {user?.displayName}
                        </span>
                    </div>
                </header>

                <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="h-full"
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;


const AnimatedItem = ({ to, children, icon, end }) => (
    <motion.li whileHover={{ x: 6 }} transition={{ type: "spring", stiffness: 260 }}>
        <NavLink
            to={to}
            end={end}
            className={({ isActive }) =>
                `
        flex items-center gap-3 px-4 py-2 rounded-xl font-medium transition-all
        ${isActive
                    ? "bg-primary text-white shadow"
                    : "text-base-content hover:bg-base-300"
                }
        `
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
