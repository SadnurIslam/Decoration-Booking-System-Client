import { Link } from "react-router";

const ServiceCard = ({ service }) => {
  return (
    <div className="group bg-base-100 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300">
      <div className="overflow-hidden">
        <img
          src={service.image}
          alt={service.service_name}
          className="h-56 w-full object-cover group-hover:scale-105 transition"
        />
      </div>

      <div className="p-6 space-y-4">
        <h3 className="text-xl font-semibold">
          {service.service_name}
        </h3>

        <p className="text-sm text-base-content/70">
          {service.description?.slice(0, 90)}...
        </p>

        <div className="flex justify-between items-center pt-2">
          <span className="font-bold text-primary">
            ৳ {service.cost}
          </span>

          <Link
            to={`/services/${service._id}`}
            className="btn btn-sm btn-outline btn-primary rounded-full"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
