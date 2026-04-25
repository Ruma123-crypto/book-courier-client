import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Context/AuthContext";

const Invoices = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">My Invoices</h2>

      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Book Name</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((p) => (
            <tr key={p._id}>
              <td>{p.paymentId}</td>
              <td>{p.bookTitle || "N/A"}</td>
              <td>{p.amount}৳</td>
              <td>{new Date(p.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Invoices;
