import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="mt-28 bg-base-200/70 backdrop-blur border-t">
      <div className="max-w-7xl mx-auto px-6 py-20 grid gap-12 md:grid-cols-4">

        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            <span className="text-primary">Style</span>Decor
          </h2>
          <p className="mt-3 text-sm text-base-content/70 leading-relaxed max-w-xs">
            A premium decoration booking platform for weddings, homes,
            and corporate events across Bangladesh.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Company</h3>
          <ul className="space-y-3 text-sm text-base-content/70">
            {[
              { label: "About Us", to: "/about" },
              { label: "Services", to: "/services" },
              { label: "Contact", to: "/contact" },
            ].map(link => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Working Hours</h3>
          <p className="text-sm text-base-content/70 leading-relaxed">
            Saturday – Thursday
            <br />
            <span className="font-medium text-base-content">
              9:00 AM – 9:00 PM
            </span>
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Follow Us</h3>
          <div className="flex items-center gap-4">
            {[
              FaFacebookF,
              FaInstagram,
              FaLinkedinIn,
            ].map((Icon, idx) => (
              <span
                key={idx}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-base-300 text-base-content/70
                           hover:border-primary hover:text-primary hover:bg-primary/5 transition-all cursor-pointer"
              >
                <Icon size={16} />
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-base-300">
        <p className="text-center py-5 text-xs text-base-content/60">
          © {new Date().getFullYear()} StyleDecor. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
