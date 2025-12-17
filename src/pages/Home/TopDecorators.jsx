import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaStar } from "react-icons/fa";
import LoadingSpinner from "../../components/LoadingSpinner";

const TopDecorators = () => {
  const axios = useAxiosSecure();

  const { data: decorators = [], isLoading } = useQuery({
    queryKey: ["top-decorators"],
    queryFn: async () => (await axios.get("/decorators/top")).data,
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <section className="bg-base-200/60 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-14">
          Trusted Decorators
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {decorators.map((d) => (
            <div
              key={d._id}
              className="bg-base-100 rounded-3xl p-6 text-center shadow hover:shadow-xl transition"
            >
              <img
                src={d.photo}
                className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
              />

              <h3 className="font-semibold">{d.name}</h3>
              <p className="text-sm text-base-content/70">{d.specialty}</p>

              <div className="flex justify-center items-center gap-1 mt-2">
                <FaStar className="text-yellow-400" />
                <span className="font-medium">{d.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopDecorators;
