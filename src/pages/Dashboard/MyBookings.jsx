import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../components/LoadingSpinner";
import { motion } from "framer-motion";

const MyBookings = () => {
  const axios = useAxiosSecure();
  const { user } = useAuth();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["my-bookings", user?.email],
    queryFn: async () => {
      const res = await axios.get(`/bookings?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handlePayment = async (booking) => {
    const res = await axios.post("/create-payment-intent", {
      bookingId: booking._id,
      serviceName: booking.serviceName,
      amount: booking.price,
      userEmail: user.email,
    });

    if (res.data?.url) {
      window.location.replace(res.data.url);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-base-content/70">
          You have not booked any services yet.
        </p>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {bookings.map((booking) => (
            <motion.div
              key={booking._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="card bg-base-100 shadow-xl rounded-3xl"
            >
              <div className="card-body space-y-4">
                <div className="flex gap-4">
                  <img
                    src={booking.serviceImage}
                    alt={booking.serviceName}
                    className="w-24 h-24 rounded-2xl object-cover"
                  />

                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">
                      {booking.serviceName}
                    </h2>
                    <p className="text-sm text-base-content/70">
                      Category: {booking.category}
                    </p>
                    <p className="font-bold text-primary mt-1">
                      ৳ {booking.price}
                    </p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="font-medium">Event Date:</span>{" "}
                    {booking.eventDate}
                  </div>
                  <div>
                    <span className="font-medium">Time Slot:</span>{" "}
                    {booking.timeSlot}
                  </div>
                  <div className="sm:col-span-2">
                    <span className="font-medium">Location:</span>{" "}
                    {booking.address}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t">
                  <span
                    className={`badge ${
                      booking.status === "Pending"
                        ? "badge-warning"
                        : booking.status === "Confirmed"
                        ? "badge-info"
                        : "badge-success"
                    }`}
                  >
                    {booking.status}
                  </span>

                  {!booking.paid && (
                    <button
                      onClick={() => handlePayment(booking)}
                      className="btn btn-primary btn-sm"
                    >
                      Pay Now
                    </button>
                  )}

                  {booking.paid && (
                    <span className="text-success font-medium">
                      Paid ✔
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
