import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useaxiosSecure from "../../hooks/useAxiosSecure";

const AllUsers = () => {
  const axiosSecure = useaxiosSecure();
  const queryClient = useQueryClient();

  // 1. Fetch users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // 2. Make Admin
  const handleMakeAdmin = async (id) => {
    try {
      const res = await axiosSecure.patch(`/users/admin/${id}`);

      if (res.data.modifiedCount > 0) {
        Swal.fire("Success!", "User is now Admin", "success");
        queryClient.invalidateQueries(["users"]);
      }
    } catch (error) {
      Swal.fire("Error", "Failed to update role", "error");
    }
  };

  // 3. Make Librarian
  const handleMakeLibrarian = async (id) => {
    try {
      const res = await axiosSecure.patch(`/users/librarian/${id}`);

      if (res.data.modifiedCount > 0) {
        Swal.fire("Success!", "User is now Librarian", "success");
        queryClient.invalidateQueries(["users"]);
      }
    } catch (error) {
      Swal.fire("Error", "Failed to update role", "error");
    }
  };

  if (isLoading) {
    return <p className="text-center mt-10">Loading users...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-5">All Users</h2>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th>Email</th>
              <th>Role</th>
              <th>Make Admin</th>
              <th>Make Librarian</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b">
                <td>{user.email}</td>

                <td>
                  <span
                    className={`px-2 py-1 rounded text-white text-sm ${
                      user.role === "admin"
                        ? "bg-red-500"
                        : user.role === "librarian"
                        ? "bg-blue-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {user.role || "user"}
                  </span>
                </td>

                {/* Admin button */}
                <td>
                  <button
                    disabled={user.role === "admin"}
                    onClick={() => handleMakeAdmin(user._id)}
                    className={`px-3 py-1 rounded text-white ${
                      user.role === "admin"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    Make Admin
                  </button>
                </td>

                {/* Librarian button */}
                <td>
                  <button
                    disabled={user.role === "librarian"}
                    onClick={() => handleMakeLibrarian(user._id)}
                    className={`px-3 py-1 rounded text-white ${
                      user.role === "librarian"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
                  >
                    Make Librarian
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;