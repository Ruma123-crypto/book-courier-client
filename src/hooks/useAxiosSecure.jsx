import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router';

  const axiosSecure=axios.create({
        baseURL: 'http://localhost:3000',

    })
const useaxiosSecure = () => {
    const {user,logOut}=useContext(AuthContext)
    const navigate=useNavigate()
    useEffect(() => {
  const reqInterceptor=axiosSecure.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${user?.accessToken}`;
    return config;
  });

//   interceptor response

const responseInterceptor=axiosSecure.interceptors.response.use((response)=>{
     
    return response
   

},
(error)=>{
console.log(error)
  const statusCode = error.response?.status;
if(statusCode===401||statusCode===403)
{
    logOut()
    .then(()=>{
        
        navigate('/login')
    })
}
    return Promise.reject(error);
})


  return()=>
  {
    axiosSecure.interceptors.request.eject(reqInterceptor)
    axiosSecure.interceptors.response.eject(responseInterceptor)
  }
}, [user,logOut,navigate]);
    
  
    return axiosSecure
};

export default useaxiosSecure;

