import React from "react";

const HowItWorks = () => {
  return (
    <div className="py-16 px-6 bg-base-100">
      <h2 className="text-4xl font-bold text-center mb-12">
        How BookCourier Works
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

        <div className="p-6 bg-base-200 rounded-xl shadow text-center">
          <div className="text-3xl font-bold text-primary mb-3">1</div>
          <h3 className="text-xl font-bold mb-2">Choose Book</h3>
          <p>Select your favorite book from our collection easily.</p>
        </div>

        <div className="p-6 bg-base-200 rounded-xl shadow text-center">
          <div className="text-3xl font-bold text-secondary mb-3">2</div>
          <h3 className="text-xl font-bold mb-2">Place Order</h3>
          <p>Fill delivery details and confirm your order quickly.</p>
        </div>

        <div className="p-6 bg-base-200 rounded-xl shadow text-center">
          <div className="text-3xl font-bold text-accent mb-3">3</div>
          <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
          <p>We deliver your book safely to your doorstep.</p>
        </div>

      </div>
    </div>
  );
};

export default HowItWorks;