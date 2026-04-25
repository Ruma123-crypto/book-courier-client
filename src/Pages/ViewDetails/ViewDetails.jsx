import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";

const ViewDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const [book, setBook] = useState(null);
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    axiosSecure
      .get(`/books/${id}`)
      .then((res) => setBook(res.data))
      .catch((err) => console.log(err));
  }, [id, axiosSecure]);

  const handleOrder = (data) => {
    const orderData = {
      bookId: book._id,
      bookTitle: book.title,
      bookImage: book.image,
      cost: book.price,
      userName: user.displayName,
      userEmail: user.email,
      phone: data.phone,
      address: data.address,
    };

    axiosSecure.post("/orders", orderData).then((res) => {
      if (res.data.insertedId) {
        Swal.fire("Success!", "Order placed successfully", "success");
        reset();
        setOpen(false);
      }
    });
  };

const handleWishlist = () => {
  Swal.fire({
    title: "Are you sure?",
    text: "Add this book to wishlist?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes",
  }).then((result) => {
    if (result.isConfirmed) {
      const wishlistData = {
        userEmail: user.email,
        bookId: book._id,
        title: book.title,
        author: book.author,
        image: book.image
      };

      axiosSecure.post('/wishlist', wishlistData)
        .then((res) => {
          if (res.data.insertedId) {
            Swal.fire("Success!", "Added to wishlist", "success");
          } 
          else if (res.data.alreadyAdded) {
            Swal.fire("Oops!", "Already added to wishlist", "info");
          }
        })
        .catch(() => {
          Swal.fire("Error!", "Something went wrong", "error");
        });
    }
  });
};
  if (!book) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* LEFT IMAGE */}
        <div>
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-[400px] object-cover rounded-xl shadow-lg"
          />
        </div>

        {/* RIGHT DETAILS */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{book.title}</h1>

          <p className="text-gray-500">Author: {book.author}</p>

          <p className="text-2xl text-primary font-bold">৳ {book.price}</p>

          <p className="text-gray-700">
            {book.description || "No description available"}
          </p>

            <div className="flex flex-col">
               <button
            onClick={() => setOpen(true)}
            className="btn btn-primary mt-4"
          >
            Order Now
          </button>

            {/* wishlisht btn */}
            <button
            onClick={handleWishlist}
            className="btn btn-primary mt-4"
          >
            Add to WishLisht
          </button>
            </div>
         
        
        </div>
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Place Order</h2>

            <form onSubmit={handleSubmit(handleOrder)} className="space-y-3">
              {/* NAME (readonly) */}
              <input
                value={user.displayName}
                readOnly
                className="input input-bordered w-full"
              />

              {/* EMAIL (readonly) */}
              <input
                value={user.email}
                readOnly
                className="input input-bordered w-full"
              />

              {/* PHONE */}
              <input
                {...register("phone", { required: true })}
                placeholder="Phone Number"
                className="input input-bordered w-full"
              />

              {/* ADDRESS */}
              <input
                {...register("address", { required: true })}
                placeholder="Address"
                className="input input-bordered w-full"
              />

              {/* BUTTONS */}
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="btn"
                >
                  Cancel
                </button>

                <button type="submit" className="btn btn-primary">
                  Place Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewDetails;
