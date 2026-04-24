import React, { useContext } from "react";
import { useForm } from "react-hook-form";

import Swal from "sweetalert2";
import { AuthContext } from "../../../Context/AuthContext";

const MyProfile = () => {
  const { user, updateUserProfile, setUser } = useContext(AuthContext);
  const { register, handleSubmit ,reset} = useForm();

  const onSubmit = (data) => {
    const profile = {
      displayName: data.name,
      photoURL: data.photo,
    };

    updateUserProfile(profile)
      .then(() => {
       
        setUser({
          ...user,
          displayName: data.name,
          photoURL: data.photo,
        });
        reset(); 
        Swal.fire({
          icon: "success",
          title: "Profile Updated Successfully!",
          timer: 2000,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

 return (
 <div className="max-w-xl mx-auto my-12 p-8 bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-lg border">

    {/* Title */}
    <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800">
      My Profile
    </h2>

    {/* Profile Info */}
    <div className="flex flex-col items-center mb-8">
      <div className="relative">
        <img
          src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
          alt="profile"
          className="w-24 h-24 rounded-full border-4 border-primary shadow-md object-cover"
        />
      </div>

      <h3 className="text-lg font-semibold mt-4 text-gray-800">
        {user?.displayName || "No Name"}
      </h3>

      <p className="text-sm text-gray-500">{user?.email}</p>
    </div>

    {/* Form */}
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

      <div>
        <label className="text-sm font-medium text-gray-600">
          Update Name
        </label>
        <input
          defaultValue={user?.displayName}
          {...register("name")}
          className="input input-bordered w-full mt-1 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter your name"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-600">
          Update Photo URL
        </label>
        <input
          defaultValue={user?.photoURL}
          {...register("photo")}
          className="input input-bordered w-full mt-1 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter photo URL"
        />
      </div>

      <button className="btn btn-primary w-full rounded-lg text-white">
        Update Profile
      </button>
    </form>

  </div>
);
};

export default MyProfile;