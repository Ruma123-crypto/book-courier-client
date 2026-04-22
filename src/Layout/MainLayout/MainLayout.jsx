import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import { Form, Outlet } from 'react-router';
import Footer from '../../Components/Footer/Footer';

const MainLayout = () => {
    return (
        <div className='max-w-6xl mx-auto bg-accent'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;