import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";

const ManageDecorators = () => {
    const axios = useAxiosSecure();

    const { data: decorators = [], isLoading, refetch } = useQuery({
        queryKey: ["decorators"],
        queryFn: async () => (await axios.get("/decorators")).data,
    });

    const handleApprove = async (id) => {
        await axios.patch(`/decorators/${id}/approve`);
        refetch();
    };

    const handleReject = async (id) => {
        await axios.patch(`/decorators/${id}/reject`);
        refetch();
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Manage Decorators</h2>

            <div className="grid md:grid-cols-2 gap-6">
                {decorators.map((d) => (
                    <div
                        key={d._id}
                        className="bg-base-200 rounded-2xl p-5"
                    >
                        <h3 className="font-semibold">{d.name}</h3>
                        <p className="text-sm opacity-70">{d.email}</p>

                        <p className="mt-2">
                            Status:{" "}
                            <span className={`badge ${d.approved ? "badge-success" : "badge-warning"}`}>
                                {d.approved ? "Approved" : "Pending"}
                            </span>
                        </p>

                        {!d.approved && (
                            <>
                                <button
                                    onClick={() => handleApprove(d._id)}
                                    className="btn btn-sm btn-primary mt-4"
                                >
                                    Approve Decorator
                                </button>
                                <button
                                    onClick={() => handleReject(d._id)}
                                    className="btn btn-sm btn-error mt-4"
                                >
                                    Reject Decorator
                                </button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageDecorators;
