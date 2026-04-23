import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import SocialLogin from './SocialLogin';
// import useaxiosSecure from '../../hooks/useAxiosSecure';
// import axios from 'axios';


const Register = () => {
const {
    register,
    handleSubmit,
    formState: { errors },
}=useForm()

 const location=useLocation();
    const navigate=useNavigate()
    // const axiosSecure=useaxiosSecure()
const {registerUser,updateUserProfile}=useContext(AuthContext)



  const handleRegister = (data) => {
    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
        .then(res => {
            console.log(res.user);
            navigate(location?.state || '/');

            const formData = new FormData();
            formData.append('image', profileImg);

            const img_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgId_Key}`;

            axios.post(img_API_URL, formData)
                .then(res => {
                    const photoURL=res.data.data.url
                    const updateProfile = {
                        displayName: data.name,
                        photoURL: photoURL
                    };


                    const userInfo = {
                            email: data.email,
                            displayName: data.name,
                            photoURL: photoURL
                        }
                        axiosSecure.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user created in the database');
                                }
                            })

                    updateUserProfile(updateProfile)
                        .then(() => {
                            console.log("Profile Updated");
                        });
                });
        })
        .catch(error => {
            console.log(error.message);
        });
};
    return (
         <div className="min-h-screen flex justify-center items-center bg-base-200">
        <div className='card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl'>
            <form className="card-body" onSubmit={handleSubmit(handleRegister)}>
         <fieldset className="fieldset">
            {/* Name field */}
          <label className="label">Name</label>
          <input type="Text" {...register('name',{required: true,})} className="input" placeholder="Your Name" />
           {
            errors.name?.type==='required'&& <p className='text-rose-500'>Name is required</p>
          }
            {/* Photo field */}
          <label className="label">Photo</label>
          <input type="file" {...register('photo',{required: true,})} className="file-input" placeholder="Email" />
           {
            errors.Photo?.type==='required'&& <p className='text-rose-500'>Photo is required</p>
          }


            {/* email field */}
          <label className="label">Email</label>
          <input type="email" {...register('email',{required: true,})} className="input" placeholder="Email" />
           {
            errors.email?.type==='required'&& <p className='text-rose-500'>Email is required</p>
          }

          {/* password field */}
          <label className="label">Password</label>
          <input type="password" {...register('password',{required: true,minLength: 6 })} className="input" placeholder="Password" />
         
            {
                errors.password?.type==='required'&&<p className='text-red-500'>Password must be required</p>
            }
          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>
            </form>
            <p className='text-center'>Already Have An Account?<span>Please<Link to='/login' className='text-red-600 underline'>Login</Link></span></p>
            <SocialLogin></SocialLogin>
        </div>
        </div>
    );
};

export default Register;