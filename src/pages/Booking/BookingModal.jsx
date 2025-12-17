import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useState } from "react";

const BookingModal = ({ service, close }) => {
  const { user } = useAuth();
  const axios = useAxiosSecure();

  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  const handleBooking = async () => {
    const booking = {
      serviceId: service._id,
      serviceName: service.service_name,
      bookingDate: date,
      location,
    };

    await axios.post("/bookings", booking);
    toast.success("Booking created");
    close();
  };

  return (
    <dialog className="modal modal-open">
      <div className="modal-box rounded-3xl">
        <h3 className="font-bold text-lg mb-4">Confirm Booking</h3>

        <input className="input input-bordered w-full mb-3" value={user.email} disabled />
        <input type="date" className="input input-bordered w-full mb-3" onChange={(e) => setDate(e.target.value)} />
        <input placeholder="Location" className="input input-bordered w-full mb-3" onChange={(e) => setLocation(e.target.value)} />

        <div className="flex justify-end gap-3">
          <button className="btn btn-ghost" onClick={close}>Cancel</button>
          <button className="btn btn-primary" onClick={handleBooking}>Confirm</button>
        </div>
      </div>
    </dialog>
  );
};

export default BookingModal;
