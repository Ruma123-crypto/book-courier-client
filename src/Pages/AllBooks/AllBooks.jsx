import React, { useEffect, useState } from "react";

import BookCard from "../../Components/BookCard/BookCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllBooks = () => {
  const axiosSecure = useAxiosSecure();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axiosSecure.get("/books").then((res) => {
      setBooks(res.data);
    });
  }, [axiosSecure]);
  return (
    <div className="my-10 max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center text-primary mb-8">
        📚 WellCome Our Books Corner
      </h2>

      {/* 🔥 MAP TO COMPONENT */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
