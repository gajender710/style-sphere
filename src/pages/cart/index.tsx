import BackToProductButton from "@/components/BackToProductButton";
import Price from "@/components/Price";
import { ProductItem } from "@/models/homeModel";
import { Link } from "react-router-dom";
import Dog from "../../assets/images/dog.png";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa";

import { useState, useEffect } from "react";
import useCartStore from "@/store/cart";
import clsx from "clsx";

const calculateSubTotal = () => {};

function CartPage() {
  const { cart, removeFromCart, addToCart } = useCartStore((state) => state);
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(
    cart?.reduce((acc, it) => acc + it.price * (it.quantity ?? 1), 0) ?? 0
  );

  const onRemoveItem = (item: ProductItem) => {
    removeFromCart(item.id);
    setSubtotal(subtotal - item.price);
  };

  const onAddItem = (item: ProductItem) => {
    addToCart(item);
    setSubtotal(subtotal + item.price);
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-8 md:space-y-0 md:space-x-4 lg:space-x-8 max-w-6xl w-11/12 mb-8 mx-auto ">
      <div className="flex flex-col justify-between h-full w-full mx-auto space-y-4 min-h-128 ">
        <div className="min-h-80  max-w-4xl my-4 sm:my-8 mx-auto w-full  ">
          <table className="mx-auto w-full ">
            <thead>
              <tr className=" uppercase text-xs sm:text-sm text-primary border-b ">
                <th className="w-[40%] font-primary font-normal px-6 py-4">
                  Product
                </th>
                <th className="w-[15%] font-primary font-normal px-6 py-4">
                  Quantity
                </th>
                <th className="w-[15%] font-primary font-normal px-6 py-4">
                  Add
                </th>
                <th className="w-[15%] font-primary font-normal px-6 py-4 hidden sm:table-cell">
                  Price
                </th>
                <th className="w-[15%] font-primary font-normal px-6 py-4">
                  Remove
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-lighter">
              {cart?.map((item, index) => (
                <tr
                  key={index}
                  className="text-sm sm:text-base text-gray-600 text-center"
                >
                  <td className="w-[40%] font-primary font-medium px-4 sm:px-6 py-4 ">
                    <div className="flex w-full items-center justify-center">
                      <img
                        src={item.images[0]}
                        height={64}
                        width={64}
                        className={`hidden sm:inline-flex`}
                      />
                      <Link
                        to={`/products/${"item.productHandle"}`}
                        className="pt-1 text-primary  ml-2 w-[60%] line-clamp-2 "
                      >
                        {item.title}
                      </Link>
                    </div>
                  </td>
                  <td className="w-[15%] font-primary font-medium px-4 sm:px-6 py-4">
                    {item.quantity}
                  </td>

                  <td className="w-[15%] font-primary font-medium px-4 sm:px-6 py-4">
                    <div className="flex w-full items-center justify-center ">
                      <AiOutlinePlus
                        size={30}
                        className=" text-primary border  p-1 "
                        onClick={() => onAddItem(item)}
                      />
                    </div>
                  </td>
                  <td className="w-[15%] font-primary text-base font-light px-4  py-4 hidden sm:table-cell ">
                    <Price currency="$ " num={item.price} numSize="text-lg" />
                  </td>
                  <td className="w-[15%] font-primary font-medium px-4 sm:px-6 py-4 ">
                    <div className="flex w-full items-center justify-center ">
                      <AiOutlineMinus
                        size={30}
                        className=" text-primary border  p-1 "
                        onClick={() => onRemoveItem(item)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
              {subtotal === 0 ? null : (
                <tr className="text-center">
                  <td></td>
                  <td></td>
                  <td className=" font-primary text-base text-gray-600 font-semibold uppercase px-4 sm:px-6 py-4">
                    Subtotal
                  </td>
                  <td className="font-primary text-lg text-primary font-medium px-4 sm:px-6 py-4">
                    <Price
                      currency="$"
                      num={Math.ceil(subtotal)}
                      numSize="text-xl"
                    />
                  </td>
                  <td></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="w-2/4 max-w-xs">
        <Link
          to={"/checkout"}
          aria-label="checkout-products"
          className={clsx([
            "bg-primary text-white hover:text-white text-lg font-primary font-semibold pt-2 pb-1 leading-relaxed flex justify-center items-center focus:ring-1 focus:outline-none w-full rounded-sm mb-2",
            { " bg-gray-400 hover:bg-gray-400": !subtotal },
          ])}
        >
          Check Out
          <FaArrowRight className="w-4 ml-2 inline-flex" />
        </Link>
        <BackToProductButton />
      </div>
    </div>
  );
}

interface Props {
  productDetail: ProductItem;
}

export default CartPage;
