import { NavLink, Link } from "react-router";
import { FiMenu, FiLogOut } from "react-icons/fi";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";
import Logo from "./Logo";
import MobileLinks from "./MobileLinks";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const navLinkClass = ({ isActive }) =>
    `relative px-2 py-1 text-sm font-semibold tracking-wide transition-colors
     ${
       isActive
         ? "text-primary"
         : "text-base-content/70 hover:text-primary"
     }
     after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full
     after:origin-left after:scale-x-0 after:bg-primary
     after:transition-transform after:duration-300
     hover:after:scale-x-100
     ${isActive ? "after:scale-x-100" : ""}`;

  return (
    <nav className="sticky top-0 z-50 border-b border-base-200 bg-base-100/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4">
        <div className="navbar min-h-[4.5rem] p-0">

          {/* Left */}
          <div className="navbar-start gap-2">
            {/* Mobile Menu */}
            <div className="dropdown">
              <label
                tabIndex={0}
                className="btn btn-ghost lg:hidden"
              >
                <FiMenu className="text-2xl" />
              </label>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 w-52 rounded-2xl border border-base-200 bg-base-100 p-3 shadow-xl"
              >
                <MobileLinks />
              </ul>
            </div>

            <Logo />
          </div>

          {/* Center */}
          <div className="navbar-center hidden lg:flex">
            <ul className="flex items-center gap-8">
              <li>
                <NavLink to="/" className={navLinkClass}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/services" className={navLinkClass}>
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard" className={navLinkClass}>
                  Dashboard
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Right */}
          <div className="navbar-end gap-3">
            {user ? (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="cursor-pointer">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    src={user.photoURL}
                    alt="user"
                    className="h-9 w-9 rounded-full object-cover ring-2 ring-primary/30"
                  />
                </label>

                <ul
                  tabIndex={0}
                  className="menu dropdown-content mt-3 w-44 rounded-2xl border border-base-200 bg-base-100 p-2 shadow-xl"
                >
                  <li className="px-2 py-1 text-xs text-base-content/60">
                    {user.email}
                  </li>
                  <li>
                    <button
                      onClick={logOut}
                      className="flex items-center gap-2 text-error"
                    >
                      <FiLogOut />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary btn-sm rounded-full">
                Login
              </Link>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;


