import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const BookingModal = ({ service, close }) => {
  const { user } = useAuth();
  const axios = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);

      const paymentInfo = {
        parcelName: service.service_name,
        parcelId: service._id,
        cost: service.cost,
        senderEmail: user.email,
      };

      const res = await axios.post("/create-payment-intent", paymentInfo);

      if (res.data?.url) {
        window.location.replace(res.data.url);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="relative w-full max-w-lg bg-base-100 rounded-3xl shadow-2xl overflow-hidden"
        >
          <button
            onClick={close}
            className="absolute top-4 right-4 text-base-content/70 hover:text-error transition"
          >
            <IoClose size={24} />
          </button>

          <div className="p-6 border-b">
            <h3 className="text-2xl font-bold">
              Confirm Booking
            </h3>
            <p className="text-sm text-base-content/70 mt-1">
              Review service details before payment
            </p>
          </div>

          <div className="p-6 space-y-5">
            <div className="flex gap-4 items-center">
              <img
                src={service.image}
                alt={service.service_name}
                className="w-20 h-20 rounded-2xl object-cover"
              />

              <div>
                <h4 className="font-semibold">
                  {service.service_name}
                </h4>
                <p className="text-sm text-base-content/70">
                  {service.category}
                </p>
              </div>
            </div>

            <div className="border-t" />

            <div className="flex justify-between items-center">
              <span className="text-base-content/70">Service Cost</span>
              <span className="font-semibold">
                ৳ {service.cost}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-base-content/70">Unit</span>
              <span className="font-medium">{service.unit}</span>
            </div>

            <div className="border-t pt-4 flex justify-between items-center">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-2xl font-bold text-primary">
                ৳ {service.cost}
              </span>
            </div>
          </div>

          <div className="p-6 border-t flex flex-col sm:flex-row gap-3">
            <button
              onClick={close}
              className="btn btn-outline w-full sm:w-1/2"
            >
              Cancel
            </button>

            <button
              onClick={handlePayment}
              disabled={loading}
              className="btn btn-primary w-full sm:w-1/2"
            >
              {loading ? "Redirecting..." : "Proceed to Payment"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookingModal;
