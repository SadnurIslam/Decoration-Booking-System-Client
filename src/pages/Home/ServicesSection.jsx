import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import ServiceCard from "../../components/ServiceCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Link } from "react-router";

const ServicesSection = () => {
  const axios = useAxiosSecure();

  const { data: services = [], isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => (await axios.get("/services?limit=6")).data,
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <section className="max-w-7xl mx-auto px-6">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-4xl font-bold">Popular Services</h2>
          <p className="text-base-content/70 mt-2">
            Hand-picked decoration packages loved by our customers
          </p>
        </div>

        <Link to="/services" className="hidden md:inline btn btn-ghost text-primary">
          View all →
        </Link>
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: { staggerChildren: 0.1 },
          },
        }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {services.map((service) => (
          <motion.div
            key={service._id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
          >
            <ServiceCard service={service} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ServicesSection;
