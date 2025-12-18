import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Swal from "sweetalert2";

const MyBookings = () => {
  const axios = useAxiosSecure();
  const { user } = useAuth();

  const { data: bookings = [], isLoading, refetch } = useQuery({
    queryKey: ["my-bookings", user?.email],
    queryFn: async () => {
      const res = await axios.get(`/bookings?email=${user.email}`);
      return res.data;
    },
  });

  const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: "Cancel booking?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
    });

    if (!result.isConfirmed) return;

    await axios.delete(`/bookings/${id}`);
    refetch();
  };

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
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

      <div className="overflow-x-auto rounded-2xl border">
        <table className="table">
          <thead className="bg-base-200">
            <tr>
              <th>Service</th>
              <th>Date</th>
              <th>Location</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td className="font-medium">{b.serviceName}</td>
                <td>{b.eventDate}</td>
                <td>{b.address}</td>

                <td>
                  <span className="badge badge-outline">
                    {b.status}
                  </span>
                </td>

                <td>
                  {b.payment_status === "paid" ? (
                    <span className="badge badge-success">Paid</span>
                  ) : (
                    <span className="badge badge-warning">Unpaid</span>
                  )}
                </td>

                <td>
                  {b.payment_status !== "paid" && (
                    <>
                      <button
                        onClick={() => handlePayment(b)}
                        className="btn btn-xs btn-info btn-outline mr-3 "
                      >
                        Pay now
                      </button>
                      <button
                        onClick={() => handleCancel(b._id)}
                        className="btn btn-xs btn-error btn-outline"
                      >
                        Cancel
                      </button>

                    </>
                  )}
                  {b.payment_status === "paid" && (
                    <span className="text-sm opacity-60">
                      N/A
                    </span>
                  )}
                </td>
              </tr>
            ))}

            {bookings.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-8 opacity-60">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookings;
