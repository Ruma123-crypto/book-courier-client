import React from "react";
import { FaTruckFast, FaTags } from "react-icons/fa6";
import { FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const BookCourier = () => {
  return (
    <div className="my-16 px-4">

      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-10"
      >
        Why Choose BookCourier?
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
          className="card bg-base-200 shadow-xl p-6 text-center"
        >
          <FaTruckFast className="text-5xl text-primary mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
          <p>We deliver books quickly all over Bangladesh.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
          className="card bg-base-200 shadow-xl p-6 text-center"
        >
          <FaShieldAlt className="text-5xl text-secondary mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Safe Delivery</h3>
          <p>Your books are always safe and tracked.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
          className="card bg-base-200 shadow-xl p-6 text-center"
        >
          <FaTags className="text-5xl text-accent mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Affordable Price</h3>
          <p>Lowest delivery cost for students and readers.</p>
        </motion.div>

      </div>
    </div>
  );
};

export default BookCourier;