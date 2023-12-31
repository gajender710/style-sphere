import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

function BackToProductButton() {
  return (
    <Link
      to="/"
      aria-label="back-to-products"
      className="border border-primary text-primary hover:text-primary  text-lg font-primary font-semibold pt-2 pb-1 leading-relaxed flex 
    justify-center items-center focus:ring-1 focus:ring-light focus:outline-none w-full rounded-sm"
    >
      <FaArrowLeft className="w-4 mr-2 inline-flex" />
      Back To All Products
    </Link>
  );
}

export default BackToProductButton;
