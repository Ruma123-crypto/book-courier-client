import React, { useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useaxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Context/AuthContext";
import Swal from "sweetalert2";

const Orders = () => {
  const axiosSecure = useaxiosSecure();
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // GET ORDERS
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["librarian-orders", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/librarian-orders?email=${user?.email}`
      );
      return res.data;
    },
  });

  // CANCEL ORDER
  const handleCancel = async (id, status) => {
    if (status === "cancelled") return;

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel this order!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(`/orders/cancel/${id}`);

      if (res.data.modifiedCount > 0) {
        queryClient.invalidateQueries({
          queryKey: ["librarian-orders", user?.email],
        });

        Swal.fire({
          title: "Cancelled!",
          text: "Order has been cancelled.",
          icon: "success",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // STATUS UPDATE
  const handleStatusChange = async (id, status) => {
    try {
      await axiosSecure.patch(`/orders/${id}/status`, { status });

      queryClient.invalidateQueries({
        queryKey: ["librarian-orders", user?.email],
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <p className="m-5">Loading...</p>;

  return (
    <div className="overflow-x-auto m-5">
      <table className="min-w-full bg-white border rounded-lg shadow-md">

        {/* HEADER */}
        <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
          <tr>
            <th className="px-6 py-4 text-left">Book</th>
            <th className="px-6 py-4 text-left">User</th>
            <th className="px-6 py-4 text-center">Status</th>
            <th className="px-6 py-4 text-center">Change Status</th>
            <th className="px-6 py-4 text-center">Action</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody className="divide-y divide-gray-100">
          {orders.map((order) => (
            <tr key={order._id} className="hover:bg-gray-50">

              {/* BOOK */}
              <td className="px-6 py-4 font-medium">
                {order.bookTitle}
              </td>

              {/* USER */}
              <td className="px-6 py-4 text-gray-600">
                {order.userName}
              </td>

              {/* STATUS */}
              <td className="px-6 py-4 text-center">
                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium ${
                    order.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status === "shipped"
                      ? "bg-blue-100 text-blue-700"
                      : order.status === "cancelled"
                      ? "bg-gray-200 text-gray-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {order.status}
                </span>
              </td>

              {/* CHANGE STATUS */}
              <td className="px-6 py-4 text-center">
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  disabled={order.status === "cancelled"}
                  className="border rounded-md px-3 py-2 text-sm w-full max-w-[140px] disabled:opacity-50"
                >
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>

              {/* ACTION */}
              <td className="px-6 py-4 text-center">
                <button
                  onClick={() => handleCancel(order._id, order.status)}
                  disabled={order.status === "cancelled"}
                  className={`text-sm px-4 py-2 rounded-md text-white transition
                    ${
                      order.status === "cancelled"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                >
                  {order.status === "cancelled" ? "Cancelled" : "Cancel"}
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;