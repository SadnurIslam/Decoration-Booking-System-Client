import React from 'react';

const MobileLinks = () => {
    const navLinkClass = ({ isActive }) =>
        `block rounded-lg px-3 py-2 text-sm font-medium transition
         ${isActive
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
                <NavLink to="/dashboard" className={navLinkClass}>
                    Dashboard
                </NavLink>
            </li>
        </>
    );
};

export default MobileLinks;