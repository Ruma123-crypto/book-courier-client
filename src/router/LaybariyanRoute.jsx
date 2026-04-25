import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import useRole from '../hooks/useRole';



const LaybariyanRoute = ({ children }) => {
    const { loading } = useContext(AuthContext)
    const { role, roleLoading } = useRole()

    if (loading || roleLoading) {
        return <span>Loading....</span>
    }

   if (role !== 'librarian' || role !== 'admin') {
    return <p className='text-2xl font-bold'>Forbidden Access</p>
}

    return children;
};

export default  LaybariyanRoute;