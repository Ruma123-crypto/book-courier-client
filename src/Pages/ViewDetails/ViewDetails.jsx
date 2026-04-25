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

  const [ratingOpen, setRatingOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const [reviews, setReviews] = useState([]);

  const { register, handleSubmit, reset } = useForm();

  // LOAD BOOK
  useEffect(() => {
    axiosSecure
      .get(`/books/${id}`)
      .then((res) => setBook(res.data))
      .catch((err) => console.log(err));
  }, [id, axiosSecure]);

  // LOAD REVIEWS
  useEffect(() => {
    axiosSecure.get(`/reviews/${id}`).then((res) => {
      setReviews(res.data);
    });
  }, [id, axiosSecure]);

  // ORDER
  const handleOrder = (data) => {
    Swal.fire({
      title: "Confirm Order?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
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
            Swal.fire("Success", "Order placed", "success");
            reset();
            setOpen(false);
          }
        });
      }
    });
  };

  // WISHLIST
  const handleWishlist = () => {
    Swal.fire({
      title: "Add to wishlist?",
      icon: "question",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .post("/wishlist", {
            userEmail: user.email,
            bookId: book._id,
            title: book.title,
            author: book.author,
            image: book.image,
          })
          .then((res) => {
            if (res.data.insertedId) {
              Swal.fire("Added!", "Wishlist updated", "success");
            } else {
              Swal.fire("Info", "Already added", "info");
            }
          });
      }
    });
  };

  // CHECK ORDER + OPEN RATING
  const handleRating = async () => {
    const res = await axiosSecure.get(
      `/orders/check?email=${user.email}&bookId=${book._id}`
    );

    if (!res.data.hasOrdered) {
      return Swal.fire(
        "Not allowed",
        "You must order this book first",
        "error"
      );
    }

    setRatingOpen(true);
  };

  // SUBMIT REVIEW
  const submitReview = async () => {
    const reviewData = {
      bookId: book._id,
      userEmail: user.email,
      userName: user.displayName,
      rating,
      comment,
    };

    const res = await axiosSecure.post("/reviews", reviewData);

    if (res.data.insertedId) {
      Swal.fire("Thanks!", "Review added", "success");

      setRatingOpen(false);
      setRating(0);
      setComment("");

      const updated = await axiosSecure.get(`/reviews/${id}`);
      setReviews(updated.data);
    }
  };

  if (!book) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* BOOK DETAILS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <img
          src={book.image}
          className="w-full h-[400px] object-cover rounded"
        />

        <div className="space-y-3">
          <h1 className="text-3xl font-bold">{book.title}</h1>
          <p>Author: {book.author}</p>
          <p className="text-xl font-bold">৳ {book.price}</p>
          <p>{book.description}</p>


          <div className="flex flex-col gap-3">
             <button onClick={() => setOpen(true)} className="btn btn-primary">
            Order Now
          </button>

          <button onClick={handleWishlist} className="btn btn-primary">
            Add Wishlist
          </button>

          <button onClick={handleRating} className="btn btn-secondary">
            Add Rating
          </button>
          </div>
         
        </div>
      </div>

    
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 w-96 rounded">
            <form onSubmit={handleSubmit(handleOrder)} className="space-y-3">

              <input value={user.displayName} readOnly className="input w-full" />
              <input value={user.email} readOnly className="input w-full" />

              <input
                {...register("phone")}
                placeholder="Phone"
                className="input w-full"
              />

              <input
                {...register("address")}
                placeholder="Address"
                className="input w-full"
              />

              <button className="btn btn-primary w-full">Place Order</button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="btn w-full mt-2"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* RATING MODAL */}
      {ratingOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 w-96 rounded">
            <h2 className="text-xl font-bold mb-3">Give Rating</h2>

            <div className="flex text-2xl mb-3">
              {[1, 2, 3, 4, 5].map((s) => (
                <span
                  key={s}
                  onClick={() => setRating(s)}
                  className={s <= rating ? "text-yellow-400" : "text-gray-300"}
                >
                  ★
                </span>
              ))}
            </div>

            <textarea
              className="w-full border p-2 mb-3"
              placeholder="Comment..."
              onChange={(e) => setComment(e.target.value)}
            />

            <div className="flex justify-between">
              <button onClick={() => setRatingOpen(false)} className="btn">
                Cancel
              </button>
              <button onClick={submitReview} className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REVIEWS */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>

        {reviews.length === 0 ? (
          <p>No reviews yet</p>
        ) : (
          reviews.map((r, i) => (
            <div key={i} className="border p-3 rounded mb-2">
              <p className="font-semibold">{r.userName}</p>
              <p className="text-yellow-500">
                {"★".repeat(r.rating)}
                {"☆".repeat(5 - r.rating)}
              </p>
              <p>{r.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewDetails;