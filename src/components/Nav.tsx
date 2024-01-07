import { FaShoppingCart } from "react-icons/fa";
import useCartStore from "@/store/cart";
import Logo from "../assets/style-sphere-logo.png";
import { Link } from "react-router-dom";

function Nav() {
  const { cartTotalItems } = useCartStore((state) => state);

  return (
    <header className="border-b border-palette-lighter sticky top-0 z-20 bg-white">
      <div className="flex items-center justify-between mx-auto max-w-6xl px-6 pb-2 pt-4 md:pt-6">
        <Link to="/">
          <h1 className="flex no-underline">
            <img src={Logo} className="h-8 w-28 object-contain " />
          </h1>
        </Link>
        <h2>test</h2>
        <div className="relative mr-8">
          <Link to="/cart" className="relative ">
            <FaShoppingCart className="text-primary w-6 m-auto" />
            {cartTotalItems ? (
              <div className="absolute top-0 right-0 text-xs bg-yellow-300 text-gray-900 font-semibold rounded-full py-1 px-3 transform translate-x-10 -translate-y-3 ">
                {cartTotalItems}
              </div>
            ) : null}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Nav;
