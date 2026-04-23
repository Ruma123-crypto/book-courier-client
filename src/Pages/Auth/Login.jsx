import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';

import SocialLogin from './SocialLogin';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Context/AuthContext';

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    }=useForm()

    const {signInUser}=useContext(AuthContext)
    const location=useLocation();
    const navigate=useNavigate()

    const handleLogin=(data)=>
    {
        signInUser(data.email,data.password)
        .then(res => {
    console.log(res);
    navigate(location?.state || '/');
})
        .catch(errors=>
        {
            console.log(errors)
        }
        )

    }
    return (
        <div className="min-h-screen flex justify-center items-center bg-base-200">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl ">
            <h3 className='text-3xl font-bold text-center'>Welcome Back</h3>
            <p className='text-center'>Please Login</p>
        <form onSubmit={handleSubmit(handleLogin)} className="card-body">
         <fieldset className="fieldset">
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
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
         </form>
         <p className='text-center'>New In Page?<span>Please<Link to='/register' className='text-red-600 underline'>Register</Link></span></p>

         <SocialLogin></SocialLogin>
      </div>
      </div>
   
    );
};

export default Login;