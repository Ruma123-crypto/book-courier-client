import React from "react";
import { useNavigate } from "react-router";

const BookCard = ({ book }) => {
  const navigate = useNavigate();
 

  return (
    <div className="card bg-base-200 shadow-md hover:shadow-xl transition">
      
      <figure>
        <img
          src={book.image}
          alt={book.title}
          className="h-48 w-full object-cover"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{book.title}</h2>
        <p className="text-sm text-gray-500">
          Author: {book.author}
        </p>

        <p className="text-primary font-bold">
          ৳ {book.price}
        </p>

        <div className="card-actions justify-end">
           <button
            onClick={() => navigate(`/view-details/${book._id}`)}
            className="btn btn-primary btn-sm"
          >
            View Details
          </button>
        </div>
      </div>

    </div>
  );
};

export default BookCard;