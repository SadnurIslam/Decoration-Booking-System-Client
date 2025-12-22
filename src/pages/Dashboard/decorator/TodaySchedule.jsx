import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/LoadingSpinner";

const TodaySchedule = () => {
  const { user } = useAuth();
  const axios = useAxiosSecure();

  const { data: AllJobs = [], isLoading } = useQuery({
    queryKey: ["today-schedule", user.email],
    queryFn: async () =>
      (await axios.get(`/bookings?decoratorEmail=${user.email}`)).data,
  });

  const jobs = AllJobs.filter((job) => {
    const today = new Date();
    const jobDate = new Date(job.eventDate);
    return (
      jobDate.getDate() === today.getDate() &&
      jobDate.getMonth() === today.getMonth() &&
      jobDate.getFullYear() === today.getFullYear()
    );
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Today's Schedule</h2>

      {jobs.map((j) => (
        <div key={j._id} className="bg-base-200 p-4 rounded-xl mb-3">
          <p>{j.serviceName}</p>
          <p>address: {j.address}</p>
          <p>Date: {j.eventDate}</p>
          <p>Time Slot: {j.timeSlot}</p>
          <p>Status: {j.status}</p>
        </div>
      ))}
    </div>
  );
};

export default TodaySchedule;
