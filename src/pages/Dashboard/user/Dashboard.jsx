import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  FaClipboardList,
  FaMoneyBillWave,
  FaClock,
} from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";

const Dashboard = () => {
  const { user } = useAuth();
  const axios = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["user-dashboard-summary", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const [bookingsRes, paymentsRes] = await Promise.all([
        axios.get(`/bookings?email=${user.email}`),
        axios.get(`/payments?email=${user.email}`),
      ]);

      return {
        bookings: bookingsRes.data,
        payments: paymentsRes.data,
      };
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const totalBookings = data.bookings.length;
  const pendingBookings = data.bookings.filter(
    (b) => b.payment_status === "unpaid"
  ).length;

  const totalPaid = data.payments.reduce(
    (sum, p) => sum + p.amount,
    0
  );

  return (
    <div className="space-y-10">

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold">
          Welcome,{" "}
          <span className="text-primary">
            {user?.displayName}
          </span>
        </h1>

        <p className="text-base-content/70 mt-2">
          Manage your bookings and payments from here
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <StatCard
          icon={<FaClipboardList />}
          title="Total Bookings"
          value={totalBookings}
        />

        <StatCard
          icon={<FaClock />}
          title="Pending Bookings"
          value={pendingBookings}
        />

        <StatCard
          icon={<FaMoneyBillWave />}
          title="Total Paid"
          value={`৳ ${totalPaid.toLocaleString()}`}
        />

      </div>

      <div className="bg-base-200/60 rounded-3xl p-6">
        <h3 className="font-semibold mb-2">
          Quick Insight
        </h3>

        <p className="text-sm text-base-content/70 leading-relaxed">
          You have{" "}
          <span className="font-semibold text-primary">
            {pendingBookings}
          </span>{" "}
          pending booking{pendingBookings !== 1 && "s"}.
          Complete payment to allow admin to assign decorators.
        </p>
      </div>

    </div>
  );
};

export default Dashboard;



const StatCard = ({ title, value, icon }) => (
  <motion.div
    whileHover={{ y: -4 }}
    transition={{ type: "spring", stiffness: 260, damping: 18 }}
    className="bg-base-200/70 rounded-3xl p-6 shadow-sm hover:shadow-lg transition"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-base-content/70 mb-1">
          {title}
        </p>
        <h3 className="text-2xl font-bold">
          {value}
        </h3>
      </div>

      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-xl">
        {icon}
      </div>
    </div>
  </motion.div>
);
