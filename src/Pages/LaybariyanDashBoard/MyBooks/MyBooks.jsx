import React, { useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Context/AuthContext";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const MyBooks = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: books = [] } = useQuery({
    queryKey: ["my-books", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-books?email=${user.email}`);
      return res.data;
    },
  });

  const handleUnpublish = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to unpublish this book!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, unpublish it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/books/unpublish/${id}`).then(() => {
          queryClient.invalidateQueries(["my-books", user.email]);

          Swal.fire(
            "Unpublished!",
            "Your book has been unpublished.",
            "success",
          );
        });
      }
    });
  };
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Books</h2>

      <table className="table w-full">
        <thead>
          <tr>
            <th>Image</th>
            <th>Book Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>
                <img src={book.image} className="w-12 h-12 rounded" />
              </td>

              <td>{book.title}</td>

              <td>{book.status}</td>

              <td className="space-x-2">
                {/* EDIT */}
                <button
                  onClick={() => navigate(`/lbdashboard/edit-book/${book._id}`)}
                  className="btn btn-primary btn-sm"
                >
                  Edit
                </button>

                {/* UNPUBLISH */}
                {book.status === "published" && (
                  <button
                    onClick={() => handleUnpublish(book._id)}
                    className="btn btn-warning btn-sm"
                  >
                    Unpublish
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyBooks;
