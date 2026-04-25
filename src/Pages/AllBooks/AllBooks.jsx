import React, { useEffect, useState } from "react";
import BookCard from "../../Components/BookCard/BookCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllBooks = () => {
  const axiosSecure = useAxiosSecure();

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  // 📦 fetch books
  const fetchBooks = () => {
    axiosSecure
      .get(`/books?search=${search}&sort=${sort}`)
      .then((res) => {
        setBooks(res.data);
      });
  };

  // প্রথম load
  useEffect(() => {
    fetchBooks();
  }, []);

  // search/sort change হলে auto fetch
  useEffect(() => {
    fetchBooks();
  }, [search, sort]);

  return (
    <div className="my-10 max-w-7xl mx-auto px-4">

      <h2 className="text-3xl font-bold text-center text-primary mb-8">
        📚 WellCome Our Books Corner
      </h2>

      {/* 🔍 SEARCH + SORT */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search book by name..."
          className="input input-bordered w-full md:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* SORT */}
        <select
          className="select select-bordered w-full md:w-1/4"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort by price</option>
          <option value="asc">Low → High</option>
          <option value="desc">High → Low</option>
        </select>
      </div>

      {/* 📚 BOOK LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.length > 0 ? (
          books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No books found 
          </p>
        )}
      </div>
    </div>
  );
};

export default AllBooks;