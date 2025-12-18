import { NavLink, Link } from "react-router";
import { FiGrid } from "react-icons/fi";
import useAuth from "../hooks/useAuth";

const MobileLinks = () => {
  const { user } = useAuth();

  const navLinkClass = ({ isActive }) =>
    `block rounded-lg px-3 py-2 text-sm font-medium transition
     ${
       isActive
         ? "bg-primary/10 text-primary"
         : "hover:bg-base-200"
     }`;

  return (
    <>
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
        <NavLink to="/about" className={navLinkClass}>
          About
        </NavLink>
      </li>

      <li>
        <NavLink to="/contact" className={navLinkClass}>
          Contact
        </NavLink>
      </li>

      {user && (
        <li className="mt-2 border-t pt-2">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-primary hover:bg-primary/10"
          >
            <FiGrid />
            Dashboard
          </Link>
        </li>
      )}
    </>
  );
};

export default MobileLinks;
