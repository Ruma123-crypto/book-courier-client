import React from "react";

const Testimonials = () => {
  return (
    <div className="py-16 bg-primary text-white">
      <h2 className="text-4xl font-bold text-center mb-12">
        What Readers Say
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">

        <div className="bg-white text-black p-6 rounded-xl shadow">
          <p className="mb-4">
            "BookCourier delivers books very fast and safely. Highly recommended!"
          </p>
          <h4 className="font-bold">— Ayesha Rahman</h4>
        </div>

        <div className="bg-white text-black p-6 rounded-xl shadow">
          <p className="mb-4">
            "Amazing service for students. Affordable and reliable."
          </p>
          <h4 className="font-bold">— Rahim Uddin</h4>
        </div>

        <div className="bg-white text-black p-6 rounded-xl shadow">
          <p className="mb-4">
            "Best book delivery platform in Bangladesh!"
          </p>
          <h4 className="font-bold">— Tanvir Hasan</h4>
        </div>

      </div>
    </div>
  );
};

export default Testimonials;