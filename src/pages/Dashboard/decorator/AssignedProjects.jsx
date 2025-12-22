import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/LoadingSpinner";


const AssignedProjects = () => {
  const { user } = useAuth();
  const axios = useAxiosSecure();

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["assigned-projects", user.email],
    queryFn: async () =>
      (await axios.get(`/bookings?decoratorEmail=${user.email}`)).data,
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Assigned Projects</h2>

      {projects.map((p) => (
        <div key={p._id} className="bg-base-200 p-5 rounded-xl mb-4">
          <p>{p.serviceName}</p>
          <p>Status: {p.status}</p>
        </div>
      ))}
    </div>
  );
};

export default AssignedProjects;
