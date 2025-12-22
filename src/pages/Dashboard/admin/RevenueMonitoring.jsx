import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";

const RevenueMonitoring = () => {
  const axios = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["admin-revenue"],
    queryFn: async () => (await axios.get("/payments")).data,
  });

  if (isLoading) return <LoadingSpinner />;

  const totalRevenue = payments.reduce(
    (sum, p) => sum + p.amount,
    0
  );

  return (
    <div className="bg-base-200 p-6 rounded-3xl">
      <h2 className="text-2xl font-bold mb-4">Revenue Monitoring</h2>

      <p className="text-3xl font-bold text-primary">
        ৳ {totalRevenue}
      </p>
      <p className="text-sm opacity-70 mt-1">
        Total revenue from completed payments
      </p>
    </div>
  );
};

export default RevenueMonitoring;
