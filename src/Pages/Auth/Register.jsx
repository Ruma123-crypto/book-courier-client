import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import SocialLogin from "./SocialLogin";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { registerUser, updateUserProfile } = useContext(AuthContext);

  const handleRegister = (data) => {
    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
      .then((res) => {
        const formData = new FormData();
        formData.append("image", profileImg);

        const img_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`;

        axios.post(img_API_URL, formData).then((res) => {
          const photoURL = res.data.data.url;

          const updateProfile = {
            displayName: data.name,
            photoURL: photoURL,
          };

          const userInfo = {
            email: data.email,
            name: data.name,
            photoURL: photoURL,
          };

          // save user to DB
          axiosSecure.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("user created in DB");
            }
          });

          // update firebase profile
          updateUserProfile(updateProfile).then(() => {
            console.log("Profile Updated");
          });

          reset();
          navigate(location?.state || "/");
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-200">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
        <form className="card-body" onSubmit={handleSubmit(handleRegister)}>
          <fieldset className="fieldset">
            {/* Name */}
            <label className="label">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="input"
              placeholder="Your Name"
            />
            <p className="text-red-500">{errors.name?.message}</p>

            {/* Photo */}
            <label className="label">Photo</label>
            <input
              type="file"
              {...register("photo", { required: "Photo is required" })}
              className="file-input"
            />
            <p className="text-red-500">{errors.photo?.message}</p>

            {/* Email */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="input"
              placeholder="Email"
            />
            <p className="text-red-500">{errors.email?.message}</p>

            {/* Password */}
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/,
                  message: "Must include uppercase, lowercase & number",
                },
              })}
              className="input"
              placeholder="Password"
            />
            <p className="text-red-500">{errors.password?.message}</p>

            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>

            <button className="btn btn-neutral mt-4">Register</button>
          </fieldset>
        </form>

        <p className="text-center pb-2">
          Already Have An Account?
          <Link to="/login" className="text-red-600 underline ml-1">
            Login
          </Link>
        </p>

        <SocialLogin />
      </div>
    </div>
  );
};

export default Register;
