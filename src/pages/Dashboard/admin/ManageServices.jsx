import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";

const ManageServices = () => {
  const axios = useAxiosSecure();

  const { data: services = [], isLoading, refetch } = useQuery({
    queryKey: ["admin-services"],
    queryFn: async () => (await axios.get("/services")).data,
  });

  const handleDelete = async (id) => {
    await axios.delete(`/services/${id}`);
    refetch();
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Services</h2>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Category</th>
              <th>Cost</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s._id}>
                <td>{s.service_name}</td>
                <td>{s.category}</td>
                <td>৳ {s.cost}</td>
                <td>
                  <button
                    onClick={() => handleDelete(s._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageServices;
