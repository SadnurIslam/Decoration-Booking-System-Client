import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AssignDecorator = ({ bookingId, refetch }) => {
  const axios = useAxiosSecure();

  const { data: decorators = [] } = useQuery({
    queryKey: ["approved-decorators"],
    queryFn: async () =>
      (await axios.get("/decorators")).data.filter(d => d.approved),
  });

  const handleAssign = async (email) => {
    await axios.patch(`/bookings/${bookingId}/assign-decorator`, {
      decoratorEmail: email,
    });
    refetch();
  };

  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {decorators.map((d) => (
        <button
          key={d._id}
          onClick={() => handleAssign(d.email)}
          className="btn btn-xs btn-outline"
        >
          Assign {d.name}
        </button>
      ))}
    </div>
  );
};

export default AssignDecorator;
