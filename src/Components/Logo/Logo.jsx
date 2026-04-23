import React from 'react';
import { IoBookSharp } from 'react-icons/io5';

const Logo = () => {
    return (
        <div className='flex items-center gap-1 text-blue-600'>
            <p ><IoBookSharp /></p>
            <p>BookCourier</p>
        </div>
    );
};

export default Logo;