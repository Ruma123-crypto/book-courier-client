import { useEffect } from "react";
import { useSearchParams } from "react-router";
import useaxiosSecure from "../../../hooks/useAxiosSecure";


const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const axiosSecure = useaxiosSecure();

  useEffect(() => {
    const orderId = params.get("orderId");
    const sessionId = params.get("session_id");

    if (orderId && sessionId) {
      axiosSecure
        .post("/payment-success", { orderId, sessionId })
        .then(() => {
          localStorage.removeItem("orderId");
        })
        .catch((err) => console.log(err));
    }
  }, [params]);

  return (
    <div className="text-center mt-10">
      <h2 className="text-3xl font-bold text-green-600">
        Payment Successful 🎉
      </h2>
      <p>Your order has been confirmed.</p>
    </div>
  );
};

export default PaymentSuccess;