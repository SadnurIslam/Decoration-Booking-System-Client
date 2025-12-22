import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/LoadingSpinner";

const PaymentHistory = () => {
  const axios = useAxiosSecure();
  const { user } = useAuth();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payment-history", user?.email],
    queryFn: async () => {
      const res = await axios.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  
  if (isLoading) return <LoadingSpinner />;
  
  
  // const uniqueTransactionIds = [...new Set(paymentsData.map(p => p.transactionId))];

  // const payments = uniqueTransactionIds.map(txId => {
  //   return paymentsData.find(p => p.transactionId === txId);
  // });


  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Payment History</h1>

      <div className="overflow-x-auto rounded-2xl border">
        <table className="table">
          <thead className="bg-base-200">
            <tr>
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((p) => (
              <tr key={p._id}>
                <td className="font-mono text-xs">
                  {p.transactionId}
                </td>
                <td className="font-semibold">
                  ৳ {p.amount}
                </td>
                <td>
                  {new Date(p.paidAt).toLocaleDateString()}
                </td>
              </tr>
            ))}

            {payments.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center py-8 opacity-60">
                  No payment history found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
