import React, { useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useaxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Context/AuthContext";

const MyOrders = () => {
  const axiosSecure = useaxiosSecure();
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // GET ORDERS (useQuery)
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?email=${user.email}`);
      return res.data;
    },
  });

  const handlePayment = async (order) => {
    try {
      localStorage.setItem("orderId", order._id);

      const paymentInfo = {
        cost: order.cost,
        orderId: order._id,
        senderEmail: order.userEmail,
        bookTitle: order.bookTitle,
      };

      const res = await axiosSecure.post(
        "/orders-payment-checkout-session",
        paymentInfo,
      );

      window.location.assign(res.data.url);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel this order!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/orders/cancel/${id}`)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              // React Query refresh
              queryClient.invalidateQueries({
                queryKey: ["orders", user.email],
                refetchType: "active",
              });

              Swal.fire({
                title: "Cancelled!",
                text: "Your order has been cancelled.",
                icon: "success",
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };
  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Book Title</th>
              <th>Order Date</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                {/* BOOK TITLE */}
                <td>{order.bookTitle}</td>

                {/* DATE */}
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>

                {/* STATUS */}
                <td>{order.status}</td>

                {/* PAYMENT STATUS */}
                <td>
                  <span
                    className={`px-3 py-1 rounded text-white text-sm ${
                      order.paymentStatus === "paid"
                        ? "bg-green-500"
                        : order.paymentStatus === "cancelled"
                          ? "bg-gray-500"
                          : "bg-red-500"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </td>

                {/* ACTION */}
                <td className="space-x-2">
                  {/* CANCEL BUTTON */}
                  {order.status === "pending" && (
                    <button
                      onClick={() => handleCancel(order._id)}
                      className="btn btn-error btn-sm"
                    >
                      Cancel
                    </button>
                  )}

                  {/* PAY NOW BUTTON */}
                  {order.status === "pending" &&
                    order.paymentStatus === "unpaid" && (
                      <button
                        onClick={() => handlePayment(order)}
                        className="btn btn-primary btn-sm"
                      >
                        Pay Now
                      </button>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
