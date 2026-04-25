import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import useRole from '../hooks/useRole';



const AdminRoute = ({ children }) => {
    const { loading } = useContext(AuthContext)
    const { role, roleLoading } = useRole()

    if (loading || roleLoading) {
        return <span>Loading....</span>
    }

    if (role !== 'admin') {
        return <p className='text-2xl font-bold'>ForBidden Access</p>
    }

    return children;
};

export default AdminRoute;