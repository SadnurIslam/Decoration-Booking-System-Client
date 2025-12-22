import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

const NoServiceFound = ({
  title = "No Services Found",
  description = "We couldn’t find any decoration services matching your search or filter criteria.",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col items-center justify-center py-24 px-6 text-center"
    >
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-3xl mb-6">
        <FaSearch />
      </div>

      <h2 className="text-2xl font-bold mb-2">
        {title}
      </h2>

      <p className="text-base-content/70 max-w-md">
        {description}
      </p>
    </motion.div>
  );
};

export default NoServiceFound;
