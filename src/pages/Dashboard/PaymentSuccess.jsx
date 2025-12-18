import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaCheckCircle } from "react-icons/fa";
import LoadingSpinner from "../../components/LoadingSpinner";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const axios = useAxiosSecure();

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const res = await axios.patch(
          `/payment-success?session_id=${sessionId}`
        );
        if (res.data?.success) {
          setSuccess(true);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) {
      verifyPayment();
    }
  }, [axios, sessionId]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="card bg-base-100 shadow-2xl rounded-3xl max-w-md w-full">
        <div className="card-body text-center space-y-4">
          <FaCheckCircle className="text-6xl text-success mx-auto" />

          <h2 className="text-3xl font-bold">
            Payment Successful 🎉
          </h2>

          <p className="text-base-content/70">
            Your booking has been confirmed successfully.
          </p>

          <div className="pt-4">
            <Link
              to="/dashboard/my-bookings"
              className="btn btn-primary w-full"
            >
              View My Bookings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
