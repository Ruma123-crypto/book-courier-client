import React, { useContext, useEffect, useState } from "react";

import Swal from "sweetalert2";
import { AuthContext } from "../../../Context/AuthContext";
import useaxiosSecure from "../../../hooks/useAxiosSecure";

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useaxiosSecure();

  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔹 Load user from MongoDB
  useEffect(() => {
    axiosSecure.get(`/users/${user.email}`).then((res) => {
      setName(res.data?.name || user.displayName || "");
      setPhotoURL(res.data?.photoURL || user.photoURL || "");
      setLoading(false);
    });
  }, [user.email]);

  // 🔹 Update profile
  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedUser = {
      name,
      photoURL,
    };

    try {
      const res = await axiosSecure.patch(
        `/users/${user.email}`,
        updatedUser
      );

      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", "Profile updated successfully", "success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>

      {/* Profile Info */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={photoURL || "https://i.ibb.co/placeholder.png"}
          alt="profile"
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>

      {/* Update Form */}
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="text-sm font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full mt-1"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Photo URL</label>
          <input
            type="text"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="input input-bordered w-full mt-1"
            placeholder="Enter photo URL"
          />
        </div>

        <button className="btn btn-primary w-full">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default MyProfile;