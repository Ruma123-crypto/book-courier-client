import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import useaxiosSecure from './useAxiosSecure';



const useRole = () => {
    const {user}=useContext(AuthContext);
    const axiosSecure=useaxiosSecure();

    const { isLoading: roleLoading, data: role = 'user' } = useQuery({
        queryKey: ['user-role', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}/role`);
            
            return res.data?.role || 'user';
        }
    })

    return { role, roleLoading };
};

export default useRole;