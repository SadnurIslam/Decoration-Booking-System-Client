import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useState } from "react";

const ManageBookings = () => {
  const axios = useAxiosSecure();
  const [assigning, setAssigning] = useState(null);

  const {
    data: bookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["admin-bookings"],
    queryFn: async () => (await axios.get("/bookings")).data,
  });

  const { data: decorators = [], isLoading: decoratorsLoading } = useQuery({
    queryKey: ["decorators"],
    queryFn: async () => (await axios.get("/decorators")).data,
  });

  const handleAssign = async (bookingId, decoratorEmail) => {
    if (!decoratorEmail) return;

    setAssigning(bookingId);

    await axios.patch(`/bookings/${bookingId}/assign`, {
      decoratorEmail,
    });

    setAssigning(null);
    refetch();
  };

  if (isLoading || decoratorsLoading) return <LoadingSpinner />;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Bookings</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>User</th>
              <th>Service</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Decorator</th>
              <th>Assign</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <BookingRow
                key={b._id}
                booking={b}
                decorators={decorators}
                onAssign={handleAssign}
                assigning={assigning}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBookings;


const BookingRow = ({ booking, decorators, onAssign, assigning }) => {
  const [selected, setSelected] = useState("");

  const canAssign =
    booking.payment_status === "paid" && !booking.decoratorEmail;

  return (
    <tr>
      <td>{booking.userEmail}</td>
      <td>{booking.serviceName}</td>

      <td>
        <span className="badge badge-outline capitalize">
          {booking.status}
        </span>
      </td>

      <td>
        <span
          className={`badge ${
            booking.payment_status === "paid"
              ? "badge-success"
              : "badge-error"
          }`}
        >
          {booking.payment_status || "unpaid"}
        </span>
      </td>

      <td>
        {booking.decoratorEmail ? (
          <span className="badge badge-primary">
            {booking.decoratorEmail}
          </span>
        ) : (
          <span className="text-sm opacity-60">Not assigned</span>
        )}
      </td>

      <td>
        {canAssign ? (
          <div className="flex gap-2">
            <select
              className="select select-bordered select-sm"
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
            >
              <option value="">Select decorator</option>
              {decorators
                .filter((d) => d.approved)
                .map((d) => (
                  <option key={d._id} value={d.email}>
                    {d.name}
                  </option>
                ))}
            </select>

            <button
              onClick={() => onAssign(booking._id, selected)}
              disabled={!selected || assigning === booking._id}
              className="btn btn-sm btn-primary"
            >
              {assigning === booking._id ? "Assigning..." : "Assign"}
            </button>
          </div>
        ) : (
          <span className="text-xs opacity-50">Already Assigned</span>
        )}
      </td>
    </tr>
  );
};
