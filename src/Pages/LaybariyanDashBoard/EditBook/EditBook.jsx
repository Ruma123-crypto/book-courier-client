import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useaxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const EditBook = () => {
  const { id } = useParams();
  const axiosSecure = useaxiosSecure();
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: "",
    image: "",
    price: "",
  });

  // load book
  useEffect(() => {
    axiosSecure.get(`/books/${id}`).then((res) => {
      setBook(res.data);
    });
  }, [id, axiosSecure]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosSecure.put(`/books/${id}`, book).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Book updated successfully",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate("/lbdashboard/my-books");
      }
    });
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-3xl font-bold mb-5">Edit Book</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="title"
          value={book.title}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Book Title"
        />

        <input
          type="text"
          name="image"
          value={book.image}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Image URL"
        />

        <input
          type="number"
          name="price"
          value={book.price}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Price"
        />

        <button className="btn btn-primary w-full">
          Update Book
        </button>
      </form>
    </div>
  );
};

export default EditBook;