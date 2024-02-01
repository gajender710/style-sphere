import { FaShoppingCart } from "react-icons/fa";
import useCartStore from "@/store/cart";
import Logo from "../assets/style-sphere-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import { TbShoppingBag } from "react-icons/tb";

import useAuthStore from "@/store/auth";
import { useState } from "react";
import clsx from "clsx";

function Nav() {
  const navigate = useNavigate();
  const { cartTotalItems } = useCartStore((state) => state);
  const { isLoggedIn, reset } = useAuthStore((state) => state);
  const [menuOpen, setMenuOpen] = useState(false);

  const onLogoutSelect = () => {
    reset();
    navigate("/");
  };

  const onOrderSelect = () => {
    navigate("/user/orders");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="border-b border-palette-lighter sticky top-0 z-20 bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl px-6 pb-2 pt-4 md:pt-6">
        <Link to="/">
          <h1 className="flex no-underline">
            <img src={Logo} className="h-8 w-28 object-contain " />
          </h1>
        </Link>
        <div className="flex flex-row items-center gap-x-4">
          <Link to="/cart" className="flex items-start w-fit ">
            <FaShoppingCart className="text-primary m-auto" />
            {cartTotalItems ? (
              <div className="flex h-6 w-6 items-center justify-center text-xs bg-yellow-300 text-gray-900 font-semibold rounded-full transform mb-5 ml-1">
                {cartTotalItems}
              </div>
            ) : null}
          </Link>

          {isLoggedIn ? (
            <>
              <CgProfile
                className="cursor-pointer peer"
                size={20}
                onClick={toggleMenu}
              />
              <div
                className={clsx([
                  `fixed h-full w-full left-0 bottom-0`,
                  {
                    hidden: !menuOpen,
                  },
                ])}
                onClick={() => menuOpen && setMenuOpen(false)}
              >
                <div
                  className={clsx([
                    `absolute flex flex-col cursor-pointer bg-gray-100 top-14 right-12 rounded-lg shadow-md w-36`,
                  ])}
                >
                  <button
                    onClick={onOrderSelect}
                    className="flex items-center gap-x-2 w-full justify-between px-6 bg-transparent"
                  >
                    <TbShoppingBag size={20} /> Orders
                  </button>
                  <button
                    onClick={onLogoutSelect}
                    className="flex items-center gap-x-2 w-full justify-between px-6 bg-transparent"
                  >
                    <MdLogout size={20} /> log out
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex flex-row text-primary font-semibold border border-gray-400 shadow-lg  hover:text-primary  rounded-md px-4 py-1"
              >
                Login
              </Link>
              <Link
                to="/sign-up"
                className="flex flex-row text-primary font-semibold border border-gray-400 shadow-lg hover:text-primary  rounded-md px-4 py-1"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Nav;
