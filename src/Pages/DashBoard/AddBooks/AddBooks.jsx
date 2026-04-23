import React, { useContext } from "react";
import { useForm } from "react-hook-form";

import Swal from "sweetalert2";
import { AuthContext } from "../../../Context/AuthContext";
import useaxiosSecure from "../../../hooks/useAxiosSecure";

const AddBooks = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useaxiosSecure();
  const { user } = useContext(AuthContext);

  const onSubmit = (data) => {
    const bookData = {
      ...data,
      price: parseFloat(data.price),
      status: data.status || "published",
      librarianEmail: user?.email,
      createdAt: new Date(),
    };

    axiosSecure.post("/books", bookData).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Book Added Successfully!",
          showConfirmButton: false,
          timer: 2000,
        });
        reset();
      }
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-base-200 shadow-md rounded-xl my-5">
      <h2 className="text-3xl font-bold mb-6 text-primary text-center">
        Add New Book
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        {/* Book Name */}
        <div>
          <label className="label">Book Name</label>
          <input
            {...register("title", { required: true })}
            type="text"
            className="input input-bordered w-full"
            placeholder="Book Name"
          />
        </div>

        {/* Author */}
        <div>
          <label className="label">Author Name</label>
          <input
            {...register("author", { required: true })}
            type="text"
            className="input input-bordered w-full"
            placeholder="Author Name"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="label">Book Image URL</label>
          <input
            {...register("image", { required: true })}
            type="text"
            className="input input-bordered w-full"
            placeholder="Image URL"
          />
        </div>

        {/* Price */}
        <div>
          <label className="label">Price (৳)</label>
          <input
            {...register("price", { required: true })}
            type="number"
            className="input input-bordered w-full"
            placeholder="Price"
          />
        </div>

        {/* Status */}
        <div>
          <label className="label">Status</label>
          <select
            {...register("status")}
            className="select select-bordered w-full"
          >
            <option value="published">Published</option>
            <option value="unpublished">Unpublished</option>
          </select>
        </div>

        {/* Submit */}
        <button className="btn btn-primary w-full">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBooks;