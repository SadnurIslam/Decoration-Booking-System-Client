import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const BookingModal = ({ service, close }) => {
  const { user } = useAuth();
  const axios = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: user?.displayName,
      userEmail: user?.email,
      serviceName: service.service_name,
      category: service.category,
      price: service.cost,
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const bookingRes = await axios.post("/bookings", {
        serviceId: service._id,
        serviceName: service.service_name,
        serviceImage: service.image,
        category: service.category,
        price: service.cost,

        userName: data.userName,
        userEmail: data.userEmail,
        eventDate: data.eventDate,
        timeSlot: data.timeSlot,
        address: data.address,
        payment_status: "unpaid",
      });

      const bookingId = bookingRes.data.insertedId;
      console.log(data);

      // Stripe payment
      const paymentRes = await axios.post("/create-payment-intent", {
        bookingId,
        serviceName: service.service_name,
        amount: service.cost,
        userEmail: user.email,
      });

      if (paymentRes.data?.url) {
        window.location.replace(paymentRes.data.url);
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
          className="relative w-full max-w-xl bg-base-100 rounded-3xl shadow-2xl overflow-hidden"
        >
          <button
            onClick={close}
            className="absolute top-4 right-4 text-base-content/70 hover:text-error"
          >
            <IoClose size={24} />
          </button>

          <div className="p-6 border-b">
            <h3 className="text-2xl font-bold">Book Decoration Service</h3>
            <p className="text-sm text-base-content/70">
              Provide event details and confirm booking
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                {...register("userName")}
                disabled
                className="input input-bordered w-full bg-base-200"
              />
              <input
                {...register("userEmail")}
                disabled
                className="input input-bordered w-full bg-base-200"
              />
            </div>

            <div className="flex gap-4 items-center">
              <img
                src={service.image}
                alt={service.service_name}
                className="w-20 h-20 rounded-2xl object-cover"
              />
              <div>
                <h4 className="font-semibold">{service.service_name}</h4>
                <p className="text-sm text-base-content/70">
                  {service.category}
                </p>
                <p className="font-bold text-primary">
                  ৳ {service.cost}
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <input
                  type="date"
                  className="input input-bordered w-full"
                  {...register("eventDate", { required: true })}
                />
                {errors.eventDate && (
                  <p className="text-error text-xs mt-1">
                    Event date is required
                  </p>
                )}
              </div>

              <div>
                <select
                  className="select select-bordered w-full"
                  {...register("timeSlot", { required: true })}
                >
                  <option value="">Select Time Slot</option>
                  <option>Morning (9AM - 12PM)</option>
                  <option>Afternoon (1PM - 5PM)</option>
                  <option>Evening (6PM - 10PM)</option>
                </select>
                {errors.timeSlot && (
                  <p className="text-error text-xs mt-1">
                    Time slot is required
                  </p>
                )}
              </div>
            </div>

            <div>
              <textarea
                placeholder="Event location / address"
                className="textarea textarea-bordered w-full"
                {...register("address", { required: true })}
              />
              {errors.address && (
                <p className="text-error text-xs mt-1">
                  Location is required
                </p>
              )}
            </div>

            <p className="text-xs text-base-content/60">
              * Decorator assignment will be based on availability and expertise.
            </p>

            <div className="pt-4 border-t flex gap-3">
              <button
                type="button"
                onClick={close}
                className="btn btn-outline w-1/2"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-1/2"
              >
                {loading ? "Processing..." : "Confirm & Pay"}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookingModal;
