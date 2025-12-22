import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useState } from "react";

const STATUS_FLOW = [
  "Assigned",
  "Planning Phase",
  "Materials Prepared",
  "On the Way to Venue",
  "Setup in Progress",
  "Completed",
];

const AssignedProjects = () => {
  const { user } = useAuth();
  const axios = useAxiosSecure();
  const [updatingId, setUpdatingId] = useState(null);

  const {
    data: projects = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["assigned-projects", user.email],
    queryFn: async () =>
      (await axios.get(`/bookings?decoratorEmail=${user.email}`)).data,
  });

  const handleStatusUpdate = async (bookingId, status) => {
    setUpdatingId(bookingId);
    await axios.patch(`/bookings/${bookingId}/status`, { status });
    setUpdatingId(null);
    refetch();
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Assigned Projects</h2>

      {projects.length === 0 && (
        <p className="text-base-content/60">
          No assigned projects yet.
        </p>
      )}

      <div className="space-y-4">
        {projects.map((p) => (
          <ProjectCard
            key={p._id}
            project={p}
            onUpdate={handleStatusUpdate}
            updatingId={updatingId}
          />
        ))}
      </div>
    </div>
  );
};

export default AssignedProjects;


const ProjectCard = ({ project, onUpdate, updatingId }) => {
  const [status, setStatus] = useState(project.status);

  const isCompleted = project.status === "Completed";

  return (
    <div className="bg-base-200 p-5 rounded-2xl space-y-2">
      <h3 className="font-semibold text-lg">{project.serviceName}</h3>

      <div className="text-sm space-y-1 opacity-80">
        <p><strong>Address:</strong> {project.address}</p>
        <p><strong>Date:</strong> {project.eventDate}</p>
        <p><strong>Time:</strong> {project.timeSlot}</p>
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-4">
        <span className="badge badge-outline">
          Current: {project.status}
        </span>

        {!isCompleted && (
          <>
            <select
              className="select select-bordered select-sm"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {STATUS_FLOW.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <button
              onClick={() => onUpdate(project._id, status)}
              disabled={
                status === project.status ||
                updatingId === project._id
              }
              className="btn btn-sm btn-primary"
            >
              {updatingId === project._id ? "Updating..." : "Update"}
            </button>
          </>
        )}

        {isCompleted && (
          <span className="badge badge-success">
            Project Completed
          </span>
        )}
      </div>
    </div>
  );
};
