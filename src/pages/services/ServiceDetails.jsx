import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import { motion } from "framer-motion";
import BookingModal from "../Booking/BookingModal";
import useAuth from "../../hooks/useAuth";

const ServiceDetails = () => {
  const { id } = useParams();
  const axios = useAxiosSecure();
  const [open, setOpen] = useState(false);
  const {loading, user} = useAuth();

  const { data: service, isLoading } = useQuery({
    queryKey: ["service-details", id],
    queryFn: async () => (await axios.get(`/services/${id}`)).data,
  });

  if (isLoading || loading) return <LoadingSpinner />;

  const handleBooking = () => {
    if (!user) {
      alert("Please log in to book a service.");
      return;
    }
    setOpen(true);
  };

  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 overflow-hidden rounded-3xl"
        >
          <div className="relative aspect-[16/9] w-full bg-base-200">
            <img
              src={service.image}
              alt={service.service_name}
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className="text-4xl font-bold leading-tight">
            {service.service_name}
          </h1>

          <p className="mt-5 text-base-content/70">
            {service.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <p className="text-2xl font-bold text-primary">
              ৳ {service.cost}{" "}
              <span className="text-sm font-medium text-base-content/60">
                / {service.unit}
              </span>
            </p>

            <button
              className="btn btn-primary rounded-full px-8"
              onClick={handleBooking}
            >
              Book Now
            </button>
          </div>
        </motion.div>

        {open && (
          <BookingModal
            service={service}
            close={() => setOpen(false)}
          />
        )}
      </div>
    </section>
  );
};

export default ServiceDetails;
