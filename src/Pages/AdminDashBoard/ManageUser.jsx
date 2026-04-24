import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useaxiosSecure from "../../hooks/useAxiosSecure";

const ManageBooks = () => {
  const axiosSecure = useaxiosSecure();
  const queryClient = useQueryClient();

  // GET ALL BOOKS (ADMIN)
  const { data: books = [], isLoading } = useQuery({
    queryKey: ["admin-books"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/books");
      return res.data;
    },
  });

  // DELETE BOOK
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete book + all orders!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/books/${id}`);

        if (res.data.success) {
          Swal.fire("Deleted!", "Book removed successfully", "success");
          queryClient.invalidateQueries(["admin-books"]);
        }
      }
    });
  };

  // PUBLISH / UNPUBLISH
  const handleStatus = async (id, currentStatus) => {
    const newStatus =
      currentStatus === "published" ? "unpublished" : "published";

    await axiosSecure.patch(`/books/status/${id}`, {
      status: newStatus,
    });

    queryClient.invalidateQueries(["admin-books"]);
  };

  if (isLoading) return <p>Loading...</p>;

return (
  <div className="p-8 bg-gray-50 min-h-screen">
    <div className="max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Manage Books
        </h2>
        <p className="text-gray-500 mt-1">
          Control all books, publish status and delete actions
        </p>
      </div>

      {/* Table Card */}
      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            
            {/* Head */}
            <thead className="bg-gray-100 border-b">
              <tr className="text-left text-gray-600 uppercase tracking-wide text-xs">
                <th className="p-4">Title</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {books.map((book) => (
                <tr
                  key={book._id}
                  className="border-b last:border-none hover:bg-gray-50 transition"
                >
                  {/* Title */}
                  <td className="p-4 font-medium text-gray-800">
                    {book.title}
                  </td>

                  {/* Price */}
                  <td className="p-4 text-green-600 font-semibold">
                    ${book.price}
                  </td>

                  {/* Status */}
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        book.status === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {book.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-4 text-center space-x-2">
                    
                    <button
                      onClick={() =>
                        handleStatus(book._id, book.status)
                      }
                      className="px-4 py-1.5 text-xs font-medium rounded-md bg-indigo-500 text-white hover:bg-indigo-600 transition"
                    >
                      {book.status === "published"
                        ? "Unpublish"
                        : "Publish"}
                    </button>

                    <button
                      onClick={() => handleDelete(book._id)}
                      className="px-4 py-1.5 text-xs font-medium rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  </div>
);
};

export default ManageBooks;