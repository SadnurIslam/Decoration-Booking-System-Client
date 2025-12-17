import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import {
  FaClipboardList,
  FaMoneyBillWave,
  FaUserCheck,
} from "react-icons/fa";

const Dashboard = () => {
  const { user } = useAuth();
  const { role } = useRole();

  return (
    <div className="space-y-10">

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold">
          Welcome back,{" "}
          <span className="text-primary">{user?.displayName}</span>
        </h1>

        <p className="text-base-content/70 mt-2">
          You are logged in as{" "}
          <span className="badge badge-primary badge-outline ml-1 capitalize">
            {role}
          </span>
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          icon={<FaClipboardList />}
          title="Total Bookings"
          value="12"
        />
        <StatCard
          icon={<FaMoneyBillWave />}
          title="Total Payments"
          value="৳ 1,20,000"
        />
        <StatCard
          icon={<FaUserCheck />}
          title="Account Status"
          value="Active"
        />
      </div>
    </div>
  );
};

export default Dashboard;


const StatCard = ({ title, value, icon }) => (
  <motion.div
    whileHover={{ y: -4 }}
    transition={{ type: "spring", stiffness: 260, damping: 20 }}
    className="bg-base-200/70 rounded-3xl p-6 shadow-md hover:shadow-xl transition-all"
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
