import { useEffect } from "react";
import { useSearchParams } from "react-router";
import useaxiosSecure from "../../../hooks/useAxiosSecure";


const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const axiosSecure = useaxiosSecure();

  useEffect(() => {
    const orderId = localStorage.getItem("orderId");

    if (orderId) {
      axiosSecure.post("/payment-success", { orderId })
        .then(() => {
          localStorage.removeItem("orderId");
        })
        .catch(err => console.log(err));
    }
  }, []);

  return <h2>Payment Successful 🎉</h2>;
};

export default PaymentSuccess;