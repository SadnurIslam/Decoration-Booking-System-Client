import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";

const StatusBadge = ({ decorator }) => {
  if (!decorator) return null;

  if (decorator.approved) {
    return <span className="badge badge-success">Approved</span>;
  }

  if (decorator.rejected) {
    return <span className="badge badge-error">Rejected</span>;
  }

  return <span className="badge badge-warning">Pending</span>;
};

const DecoratorApply = () => {
  const { user } = useAuth();
  const axios = useAxiosSecure();

  const {
    data: decorator,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["decorator-status", user?.email],
    queryFn: async () => {
      const res = await axios.get(`/decorators?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });
  console.log(decorator);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const decoratorInfo = {
      name: user.displayName,
      email: user.email,
      phone: data.phone,
      experience: data.experience,
      specialty: data.specialty,
      rating: 0,
    };

    await axios.post("/decorators", decoratorInfo);
    reset();
    refetch();
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">
        Decorator Application
      </h1>

      {decorator ? (
        <div className="bg-base-200 rounded-3xl p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">
              Application Status
            </h2>
            <StatusBadge decorator={decorator} />
          </div>

          <div className="text-sm text-base-content/70 space-y-1">
            <p>
              <strong>Name:</strong> {decorator.name}
            </p>
            <p>
              <strong>Email:</strong> {decorator.email}
            </p>
            <p>
              <strong>Specialty:</strong> {decorator.specialty}
            </p>
            <p>
              <strong>Experience:</strong> {decorator.experience} years
            </p>
          </div>

          {!decorator.approved && (
            <p className="text-sm text-warning">
              Your application is under admin review.
            </p>
          )}
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-base-200 rounded-3xl p-6 space-y-4"
        >
          <h2 className="text-lg font-semibold mb-2">
            Apply as Decorator
          </h2>

          <input
            className="input input-bordered w-full"
            placeholder="Phone Number"
            {...register("phone", { required: true })}
          />
          {errors.phone && (
            <p className="text-error text-sm">
              Phone is required
            </p>
          )}

          <input
            type="number"
            className="input input-bordered w-full"
            placeholder="Years of Experience"
            {...register("experience", { required: true, min: 0 })}
          />
          {errors.experience && (
            <p className="text-error text-sm">
              Experience is required
            </p>
          )}

          <input
            className="input input-bordered w-full"
            placeholder="Specialty (Wedding, Home, Office...)"
            {...register("specialty", { required: true })}
          />
          {errors.specialty && (
            <p className="text-error text-sm">
              Specialty is required
            </p>
          )}

          <button className="btn btn-primary w-full">
            Submit Application
          </button>
        </form>
      )}
    </div>
  );
};

export default DecoratorApply;
