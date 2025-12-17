import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-base-200 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-2">
            <span className="text-primary">Style</span>Decor
          </h2>
          <p className="text-sm opacity-80">
            Smart Home & Ceremony Decoration Booking Platform.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link to='/about'>About Us</Link></li>
            <li><Link to='/services'>Services</Link></li>
            <li><Link to='/contact'>Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Working Hours</h3>
          <p className="text-sm opacity-80">
            Sat - Thu: 9:00 AM - 9:00 PM
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <FaFacebook className="hover:text-primary cursor-pointer" />
            <FaInstagram className="hover:text-primary cursor-pointer" />
            <FaLinkedin className="hover:text-primary cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="text-center py-4 text-sm opacity-70 border-t">
        © {new Date().getFullYear()} StyleDecor. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
