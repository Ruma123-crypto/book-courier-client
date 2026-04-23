import React from 'react';
import Banner from './HomePage/Banner/Banner';
import LatestBook from './HomePage/LatestBook/LatestBook';
import CovarageArea from './HomePage/CovarageArea/CovarageArea';
import BookCourier from './HomePage/BookCourier/BookCourier';

import HowItWorks from './HomePage/HowitWorks/HowitWorks';
import Testimonials from './HomePage/Testimonials/Testimonials';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <LatestBook></LatestBook>
            <CovarageArea></CovarageArea>
            <BookCourier></BookCourier>
            <HowItWorks></HowItWorks>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;