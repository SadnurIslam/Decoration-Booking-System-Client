import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Link } from "react-router";

const MyBookings = () => {
  const { user } = useAuth();
  const axios = useAxiosSecure();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["my-bookings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`/bookings?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-8">

      <div>
        <h2 className="text-2xl font-bold">My Bookings</h2>
        <p className="text-base-content/70 mt-1">
          View and manage your decoration bookings
        </p>
      </div>

      {bookings.length === 0 && (
        <div className="bg-base-200/70 rounded-3xl p-10 text-center">
          <p className="text-lg font-medium mb-2">
            No bookings yet
          </p>
          <p className="text-base-content/70 mb-6">
            Browse services and book your first decoration.
          </p>
          <Link to="/services" className="btn btn-primary">
            Explore Services
          </Link>
        </div>
      )}

      {bookings.length > 0 && (
        <div className="overflow-x-auto rounded-3xl bg-base-100 shadow-md">
          <table className="table">
            <thead className="bg-base-200">
              <tr>
                <th>Service</th>
                <th>Category</th>
                <th>Cost</th>
                <th>Status</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((item, index) => (
                <motion.tr
                  key={item._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                >
                  <td>
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.service_name}
                        className="w-12 h-12 rounded-xl object-cover"
                      />
                      <span className="font-medium">
                        {item.service_name}
                      </span>
                    </div>
                  </td>

                  <td className="capitalize">
                    {item.category}
                  </td>

                  <td className="font-semibold">
                    ৳ {item.cost}
                  </td>

                  <td>
                    <span
                      className={`badge ${
                        item.paymentStatus === "paid"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {item.paymentStatus || "pending"}
                    </span>
                  </td>

                  <td className="text-right">
                    {item.paymentStatus !== "paid" ? (
                      <Link
                        to={`/dashboard/payment/${item._id}`}
                        className="btn btn-sm btn-primary"
                      >
                        Pay Now
                      </Link>
                    ) : (
                      <span className="text-sm text-success font-medium">
                        Paid
                      </span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
