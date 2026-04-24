import React from 'react';

const PaymentCancel = () => {
    return (
            <div className="h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold text-red-500">
        Payment Cancelled
      </h1>

      <p className="mt-2 text-gray-600">
        You did not complete the payment.
      </p>

      <a href="/dashboard/my-orders" className="btn btn-primary mt-5">
        Go Back to Orders
      </a>
    </div>

    );
};

export default PaymentCancel;