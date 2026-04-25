import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Context/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const MyWishList = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: wishlist = [], isLoading } = useQuery({
    queryKey: ["wishlist", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlist/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Author</th>
            </tr>
          </thead>

          <tbody>
            {wishlist.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>

                <td>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>

                <td>{item.title}</td>
                <td>{item.author}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {wishlist.length === 0 && (
        <p className="text-center mt-5 text-gray-500">
          No wishlist items found
        </p>
      )}
    </div>
  );
};

export default MyWishList;