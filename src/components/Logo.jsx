import { Link } from "react-router";
import { FaPaintRoller } from "react-icons/fa";

const Logo = ({ white = false }) => {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 font-bold text-2xl tracking-wide"
    >
      <FaPaintRoller
        className={`text-3xl ${white ? "text-white" : "text-primary"}`}
      />
      <span className={white ? "text-white" : "text-base-content"}>
        Style<span className="text-primary">Decor</span>
      </span>
    </Link>
  );
};

export default Logo;
