import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";

const ManageBookings = () => {
  const axios = useAxiosSecure();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["admin-bookings"],
    queryFn: async () => (await axios.get("/bookings")).data,
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Bookings</h2>

      <table className="table">
        <thead>
          <tr>
            <th>User</th>
            <th>Service</th>
            <th>Status</th>
            <th>Payment</th>
            <th>Decorator</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b._id}>
              <td>{b.userEmail}</td>
              <td>{b.serviceName}</td>
              <td>{b.status}</td>
              <td>
                <span
                  className={`badge ${
                    b.payment_status === "paid"
                      ? "badge-success"
                      : "badge-error"
                  }`}
                >
                  {b.payment_status || "unpaid"}
                </span>
              </td>
                <td>
                  {b.decoratorEmail || "Not assigned"}
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageBookings;
