import { Link } from "react-router";
import { FaTimesCircle } from "react-icons/fa";

const PaymentCancel = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="card bg-base-100 shadow-2xl rounded-3xl max-w-md w-full">
        <div className="card-body text-center space-y-4">
          <FaTimesCircle className="text-6xl text-error mx-auto" />

          <h2 className="text-3xl font-bold">
            Payment Cancelled
          </h2>

          <p className="text-base-content/70">
            Your payment was not completed. You can retry anytime.
          </p>

          <div className="flex flex-col gap-3 pt-4">
            <Link
              to="/dashboard/my-bookings"
              className="btn btn-outline"
            >
              Back to My Bookings
            </Link>

            <Link
              to="/services"
              className="btn btn-primary"
            >
              Browse Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
