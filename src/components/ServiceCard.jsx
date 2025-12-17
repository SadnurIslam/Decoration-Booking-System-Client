import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

const ServiceCard = ({ service }) => {
  const {
    _id,
    service_name,
    image,
    cost,
    unit,
    category,
    description,
  } = service;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="group h-full"
    >
      <div className="bg-base-100 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 h-full flex flex-col">

        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={service_name}
            className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {category && (
            <span className="absolute top-4 left-4 bg-primary/90 text-white text-xs font-semibold px-4 py-1 rounded-full">
              {category}
            </span>
          )}
        </div>

        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-xl font-semibold leading-snug mb-2">
            {service_name}
          </h3>

          <p className="text-base-content/70 text-sm line-clamp-3 mb-4">
            {description}
          </p>

          <div className="mt-auto flex items-center justify-between">
            <p className="text-lg font-bold text-primary">
              ৳ {cost}
              <span className="text-sm font-medium text-base-content/60">
                {" "}
                / {unit}
              </span>
            </p>

            <Link
              to={`/services/${_id}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all"
            >
              View details
              <FaArrowRight className="text-xs" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
