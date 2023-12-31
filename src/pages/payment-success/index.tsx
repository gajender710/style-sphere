import React from "react";
import boy from "../../assets/boy-with-bag.png";

const PaymentSuccessPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <img src={boy} className="h-80 w-80" />
      <h3 className="text-2xl font-extrabold">Payment Success</h3>
    </div>
  );
};

export default PaymentSuccessPage;
